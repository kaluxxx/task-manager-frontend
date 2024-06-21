import {Eye} from "lucide-react";

import {useState} from "react";

export default function HiddenCell({value}: {value: string}) {
    const hiddenValue = value.replace(/./g, "*");
    const [state, setState] = useState({hidden: true});

    const handleClick = () => {
        setState({hidden: !state.hidden});
    };

    return (
        <div className="flex items-center gap-2">
            {state.hidden ? hiddenValue : value}
            <Eye
                className="h-4 w-4 shrink-0 cursor-pointer"
                onClick={handleClick}
            />
        </div>
    );
}
