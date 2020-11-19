import {BaseCameraPointersInput} from "@babylonjs/core/Cameras/Inputs/BaseCameraPointersInput";
import {CameraInputTypes, Nullable, PointerTouch, serialize} from "@babylonjs/core";

export class ArcRotateCameraPointersCustomInput extends BaseCameraPointersInput {

    /**
     * Defines the camera the input is attached to.
     */
    // @ts-ignore

    public camera: ArcRotateCamera;

    /**
     * Gets the class name of the current input.
     * @returns the class name
     */
    public getClassName(): string {
        return "ArcRotateCameraPointersCustomInput";
    }

    /**
     * Defines the buttons associated with the input to handle camera move.
     */
    @serialize()
    public buttons = [0, 1, 2];

    /**
     * Defines the pointer angular sensibility  along the X axis or how fast is
     * the camera rotating.
     */
    @serialize()
    public angularSensibilityX = 1000.0;

    /**
     * Defines the pointer angular sensibility along the Y axis or how fast is
     * the camera rotating.
     */
    @serialize()
    public angularSensibilityY = 1000.0;

    /**
     * Defines the pointer pinch precision or how fast is the camera zooming.
     */
    @serialize()
    public pinchPrecision = 12.0;

    /**
     * pinchDeltaPercentage will be used instead of pinchPrecision if different
     * from 0.
     * It defines the percentage of current camera.radius to use as delta when
     * pinch zoom is used.
     */
    @serialize()
    public pinchDeltaPercentage = 0;

    /**
     * Defines the pointer panning sensibility or how fast is the camera moving.
     */
    @serialize()
    public panningSensibility: number = 1000.0;

    /**
     * Defines whether panning (2 fingers swipe) is enabled through multitouch.
     */
    @serialize()
    public multiTouchPanning: boolean = true;

    /**
     * Defines whether panning is enabled for both pan (2 fingers swipe) and
     * zoom (pinch) through multitouch.
     */
    @serialize()
    public multiTouchPanAndZoom: boolean = true;

    /**
     * Revers pinch action direction.
     */
    public pinchInwards = true;

    private _isPanClick: boolean = false;
    private _twoFingerActivityCount: number = 0;
    private _isPinching: boolean = false;

    /**
     * Called on pointer POINTERMOVE event if only a single touch is active.
     */
    protected onTouch(point: Nullable<PointerTouch>,
                      offsetX: number,
                      offsetY: number): void {
        console.log("onTouch")
        if (this.panningSensibility !== 0 &&
            ((this._ctrlKey && this.camera._useCtrlForPanning) || this._isPanClick)) {
            this.camera.inertialPanningX += -offsetX / this.panningSensibility;
            this.camera.inertialPanningY += offsetY / this.panningSensibility;
        } else {
            this.camera.inertialAlphaOffset -= offsetX / this.angularSensibilityX;
            this.camera.inertialBetaOffset -= offsetY / this.angularSensibilityY;
        }
    }

    /**
     * Called on pointer POINTERDOUBLETAP event.
     */
    protected onDoubleTap(type: string) {
        console.log("onDoubleTap")
        if (this.camera.useInputToRestoreState) {
            this.camera.restoreState();
        }
    }

    /**
     * Called on pointer POINTERMOVE event if multiple touches are active.
     */
    protected onMultiTouch(pointA: Nullable<PointerTouch>,
                           pointB: Nullable<PointerTouch>,
                           previousPinchSquaredDistance: number,
                           pinchSquaredDistance: number,
                           previousMultiTouchPanPosition: Nullable<PointerTouch>,
                           multiTouchPanPosition: Nullable<PointerTouch>): void
    {
        console.log("onMultiTouch")
        if (previousPinchSquaredDistance === 0 && previousMultiTouchPanPosition === null) {
            // First time this method is called for new pinch.
            // Next time this is called there will be a
            // previousPinchSquaredDistance and pinchSquaredDistance to compare.
            return;
        }
        if (pinchSquaredDistance === 0 && multiTouchPanPosition === null) {
            // Last time this method is called at the end of a pinch.
            return;
        }

        const direction = this.pinchInwards ? 1 : -1;

        if (this.multiTouchPanAndZoom) {
            if (this.pinchDeltaPercentage) {
                this.camera.inertialRadiusOffset +=
                    (pinchSquaredDistance - previousPinchSquaredDistance) * 0.001 *
                    this.camera.radius * this.pinchDeltaPercentage;
            } else {
                this.camera.inertialRadiusOffset +=
                    (pinchSquaredDistance - previousPinchSquaredDistance) /
                    (this.pinchPrecision * direction *
                        (this.angularSensibilityX + this.angularSensibilityY) / 2);
            }

            if (this.panningSensibility !== 0 &&
                previousMultiTouchPanPosition && multiTouchPanPosition) {
                var moveDeltaX = multiTouchPanPosition.x - previousMultiTouchPanPosition.x;
                var moveDeltaY = multiTouchPanPosition.y - previousMultiTouchPanPosition.y;
                console.log("moveDeltaX" + moveDeltaX)
                console.log("moveDeltaY" + moveDeltaY)
                this.camera.inertialPanningX += -moveDeltaX / this.panningSensibility;
                this.camera.inertialPanningY += moveDeltaY / this.panningSensibility;
            }
        } else {
            this._twoFingerActivityCount++;
            const previousPinchDistance = Math.sqrt(previousPinchSquaredDistance);
            const pinchDistance = Math.sqrt(pinchSquaredDistance);
            if (this._isPinching ||
                (this._twoFingerActivityCount < 20 &&
                    Math.abs(pinchDistance - previousPinchDistance) >
                    this.camera.pinchToPanMaxDistance)) {

                console.log("pinchDistance" + pinchDistance)
                console.log("previousPinchDistance" + previousPinchDistance)
                // Since pinch has not been active long, assume we intend to zoom.
                if (this.pinchDeltaPercentage) {
                    this.camera.inertialRadiusOffset +=
                        (pinchSquaredDistance - previousPinchSquaredDistance) * 0.001 *
                        this.camera.radius * this.pinchDeltaPercentage;
                } else {
                    this.camera.inertialRadiusOffset +=
                        (pinchSquaredDistance - previousPinchSquaredDistance) /
                        (this.pinchPrecision * direction *
                            (this.angularSensibilityX + this.angularSensibilityY) / 2);
                }

                // Since we are pinching, remain pinching on next iteration.
                this._isPinching = true;
            } else {
                // Pause between pinch starting and moving implies not a zoom event.
                // Pan instead.
                if (this.panningSensibility !== 0 && this.multiTouchPanning &&
                    multiTouchPanPosition && previousMultiTouchPanPosition) {
                    var moveDeltaX = multiTouchPanPosition.x - previousMultiTouchPanPosition.x;
                    var moveDeltaY = multiTouchPanPosition.y - previousMultiTouchPanPosition.y;
                    console.log("moveDeltaX 2" + moveDeltaX)
                    console.log("moveDeltaY 2" + moveDeltaY)
                    this.camera.inertialPanningX += -moveDeltaX / this.panningSensibility;
                    this.camera.inertialPanningY += moveDeltaY / this.panningSensibility;
                }
            }
        }
    }

    /**
     * Called each time a new POINTERDOWN event occurs. Ie, for each button
     * press.
     */
    protected onButtonDown(evt: PointerEvent): void {
        this._isPanClick = evt.button === this.camera._panningMouseButton;
    }

    /**
     * Called each time a new POINTERUP event occurs. Ie, for each button
     * release.
     */
    protected onButtonUp(evt: PointerEvent): void {
        this._twoFingerActivityCount = 0;
        this._isPinching = false;
    }

    /**
     * Called when window becomes inactive.
     */
    protected onLostFocus(): void {
        this._isPanClick = false;
        this._twoFingerActivityCount = 0;
        this._isPinching = false;
    }
}
(<any>CameraInputTypes)["ArcRotateCameraPointersCustomInput"] =
    ArcRotateCameraPointersCustomInput;