import * as React from "react";
import {withTheme} from "styled-components";
import {Scene} from "@babylonjs/core/scene";
import {useSelector} from "react-redux";
import {Theme} from "@material-ui/core";
import {cameraTargetChanged, cameraTargetSelector} from "../../../../../store/entities/camera/cameraReducer";
import {AbstractMesh, ArcRotateCamera, Matrix, Vector3} from "@babylonjs/core";
import {targetAxisVisibilitySelector} from "../../../../../store/entities/scene/sceneReducer";
import constructAxis from "../../scene/code/constructAxis";
import {OnCanvasContainer} from "../../shared/style";
import {useEffect} from "react";
import IoC from "../../../../../environment/ioc/IoC";
import {EventBusService} from "../../../../../services/eventBus/EventBusService";
import {EVENT_BUS_SERVICE} from "../../../../../environment/ioc/ServiceTypes";
import {
    CANVAS_MOUSE_CLICK_EVENT,
    KEY_PRESSED_EVENT,
    KEY_UNPRESSED_EVENT
} from "../../../../../services/eventBus/EventTypes";
import {useAppDispatch} from "../../../../../store/store";

let axisMeshes: AbstractMesh[] | null = null

const AxisSubLayer: React.FC<{ theme: Theme, scene: Scene }> = (props) => {
    const dispatch = useAppDispatch();
    const {scene} = props
    let isKeyPressed: boolean = false

    const cameraTarget = useSelector(cameraTargetSelector)
    const axisIsVisible = useSelector(targetAxisVisibilitySelector)

    if (axisIsVisible && scene && cameraTarget) {
        axisMeshes = constructAxis(scene, 2, cameraTarget);
    } else if (!axisIsVisible && scene && axisMeshes) {
        for (const mesh of axisMeshes) {
            mesh.dispose()
        }
    }

    useEffect(() => {
        const eventBus = IoC.get<EventBusService>(EVENT_BUS_SERVICE);
        eventBus.subscribe(KEY_PRESSED_EVENT, OnKeyPressed);
        eventBus.subscribe(KEY_UNPRESSED_EVENT, OnKeyUnPressed);
        eventBus.subscribe(CANVAS_MOUSE_CLICK_EVENT, canvasClickHandle)

        return () => {
            eventBus.unsubscribe(KEY_PRESSED_EVENT, OnKeyPressed);
            eventBus.unsubscribe(KEY_UNPRESSED_EVENT, OnKeyUnPressed);
            eventBus.unsubscribe(CANVAS_MOUSE_CLICK_EVENT, canvasClickHandle);
        }
    }, [scene])

    function changeCameraTarget(mouseEvent: MouseEvent) {
        const mousePosition = new Vector3(mouseEvent.screenX, mouseEvent.screenY, 0);
        const engine = scene.getEngine();
        const vector = Vector3.Unproject(
            mousePosition,
            engine.getRenderWidth(),
            engine.getRenderHeight(),
            Matrix.Identity(),
            scene.getViewMatrix(),
            scene.getProjectionMatrix());
        dispatch(cameraTargetChanged(vector));
        isKeyPressed = false;
        document.documentElement.style.cursor = "default";

        const activeCamera = scene.activeCamera as ArcRotateCamera;
        activeCamera.target = vector;
    }

    const canvasClickHandle = (data: any) => {
        if (!isKeyPressed || !scene) {
            return;
        }

        const mouseEvent = data[0] as MouseEvent;
        changeCameraTarget(mouseEvent)
    }

    const OnKeyPressed = (keys: string[]) => {
        const key = keys[0];

        if (key === 'c' || key === 'C') {
            isKeyPressed = true;
            document.documentElement.style.cursor = "crosshair";
        }
    }

    const OnKeyUnPressed = (keys: string[]) => {
        const key = keys[0];

        if (key === 'c' || key === 'C') {
            isKeyPressed = false;
            document.documentElement.style.cursor = "default";
        }
    }

    return (
        <OnCanvasContainer/>
    );
};

// @ts-ignore
export default withTheme(AxisSubLayer);