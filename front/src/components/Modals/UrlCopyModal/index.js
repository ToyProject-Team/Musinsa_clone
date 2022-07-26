import { useCallback, useState } from 'react';
import { CreateModal, BoxLayout } from './styles';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook';
import { AiFillTwitterCircle } from '@react-icons/all-files/ai/AiFillTwitterCircle';
import TextModal from 'components/Modals/TextModal';

const UrlCopyModal = ({ show, onCloseModal }) => {
    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState('');

    const closeModal = e => {
        setOpen(!e);
    };

    // URL 복사
    const copyURL = useCallback(
        async text => {
            try {
                await navigator.clipboard.writeText(text);

                const timer = setTimeout(() => setCopy(''), 5000);
                setOpen(true);

                return () => {
                    clearTimeout(timer);
                };
            } catch (error) {
                console.log(error);
            }
        },
        [copy],
    );

    const stopPropagation = useCallback(e => {
        e.stopPropagation();
    }, []);

    if (!show) {
        return null;
    }

    return (
        <>
            <CreateModal onClick={onCloseModal}>
                <BoxLayout onClick={stopPropagation}>
                    <h1>
                        <CgClose onClick={onCloseModal} />
                    </h1>
                    <div>
                        <div>
                            <input type="text" value={'https://www.musinsa.com/app/'} readOnly />
                            <span onClick={() => copyURL(window.location.href)}>URL 복사</span>
                        </div>
                        <p>- 현재 보고 있는 페이지를 공유합니다.</p>
                        <section>
                            <p>
                                <FaFacebook />
                            </p>
                            <p>
                                <AiFillTwitterCircle />
                            </p>
                        </section>
                        <p className="last">
                            <span>페이스북</span>
                            <span>트위터</span>
                        </p>
                    </div>
                </BoxLayout>
            </CreateModal>
            <TextModal show={open} onCloseModal={closeModal} content={'URL이 복사되었습니다.'} />
        </>
    );
};

export default UrlCopyModal;
