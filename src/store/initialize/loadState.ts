//Todo: load state from database
export default function loadState() {
    return {
        windowPanels: {
            pointsCloudWindowPanel: {
                isActive: false,
                position: {x: 0, y: 0},
                filterXFromLimit : -5,
                filterXToLimit : 5,
                filterYFromLimit : -5,
                filterYToLimit : 5,
                filterZFromLimit : -5,
                filterZToLimit : 5,
            }
        }
    };
}