export function* showSchemeModelSaga(action: { payload: string[] }) {
    const activeModels = action.payload;

    if (!activeModels || activeModels.length === 0)
        return;


}