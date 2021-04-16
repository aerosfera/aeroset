import {useHistory} from "react-router-dom";

const DebugRouter = ({ children }: { children: any }) => {
    const { location } = useHistory()
    if (process.env.NODE_ENV === 'development') {
        console.log(
            `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`,
        )
    }

    return children
}

export default DebugRouter;