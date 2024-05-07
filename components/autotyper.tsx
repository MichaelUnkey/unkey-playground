import { TypeAnimation } from "react-type-animation";

type Props = {
    sequence: any[];
    wrapper?: string;
    cursor?: boolean;
    style?: string;
    repeat?: number;
    className?: string;
};

export const AutoTyper: React.FC<React.PropsWithRef<Props>> = ({  sequence, wrapper, cursor, repeat, className } ) => {
    return (
        <TypeAnimation
            sequence={sequence || ["Hello, World!"]}
            wrapper={wrapper ? "span": undefined}
            cursor={cursor ?? true}
            repeat={repeat ?? 1}
            className={className}
        />
    );
};
