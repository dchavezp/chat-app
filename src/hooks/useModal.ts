
import { useEffect } from "react";
import useToggle from "./useToggle";
import { modalService } from "~/services/modal.service";

function useModal() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [value, _, setValue] = useToggle(false)
    const suscription = modalService.getSubject();
    const activeModal = (active: boolean) => {
        modalService.setSubject(active)
    }
    useEffect(() => {
        suscription.subscribe((data) => {
            setValue(data);
        });
    }, [suscription, setValue]);
    return { showModal: value, activeModal }
}

export default useModal;