import { Button } from "react-native";

export default function MyButton(props: { label: string, onClick: () => void }) {
    return (
        <>
            <Button
                title={props.label}
                onPress={() => props.onClick()}
                color="#1d1d1d"
            />
        </>
    )
}