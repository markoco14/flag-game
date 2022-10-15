import { useState, useRef, useEffect } from "react";

type DeleteProps = {
    id: number | undefined
}

export default function DeleteModal(props: DeleteProps) {
    // const [isVisible, setIsVisible] = useState(false);
    const deleteModal = useRef<HTMLDialogElement>(null);


    function deleteFlagSet() {
        console.log('You clicked delete')
    }

    useEffect(() => {
        deleteModal?.current?.showModal();
    }, [])

    return(
        <dialog
            ref={deleteModal}
        >
            <div style={{marginBottom: '1rem',}}>
                <p style={{textAlign: 'center', fontWeight: '700'}}>Warning!</p>
                {/* <p>You are about to delete your flag set: {selectedFlag?.title}.</p> */}
                <p>Once you do, you can&apos;t get it back.</p>
            </div>
            <p style={{marginBottom: '1rem',}}>Are you sure you want to delete this set?</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem',}}>
                <button onClick={deleteFlagSet}>Delete</button>
                <button onClick={() => {deleteModal?.current?.close()}}>Cancel</button>
            </div>
        </dialog>
    );
}