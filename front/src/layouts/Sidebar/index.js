import { useState, useCallback, useEffect } from 'react';
import { SContainer, SDiv } from './styles';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import Cookies from 'js-cookie';
import { SIDEBAR, useGlobalDispatch } from 'context/GlobalContext';
import { useMainState, useMainDispatch } from 'context/MainContext';
import { CATEGORY } from 'context/MainContext';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus';

const Sidebar = props => {
    const dispatch = useGlobalDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // const [cancel, setCancel] = useState(true);
    const [cancel, setCancel] = useState(Cookies.get('sideBarToggle') === 'false' ? false : true);
    const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));

    const state = useMainState();
    const dispatchMain = useMainDispatch();

    //const [clickSideBar, setClickSideBar] = useState([]);

    useEffect(() => {
        const payload = {
            sideBar: cancel,
        };
        dispatch({ type: SIDEBAR, payload });
    }, []);

    //Main - filterVal 수정 등
    const sendSmallCate = (big, small) => {
        // smallCate index가 0인 경우(전체) / 아닌경우
        // smallCate index가 1이상인 경우에는 bigCateId가 이미 있는경우/없는경우
        //이중 삼항연산자

        const newArr = props.clickSideBar;
        if (props.clickSideBar.includes(true)) {
            newArr[props.clickSideBar.indexOf(true)] = false;
        }
        newArr[small] = true;
        props.setClickSideBar(() => newArr);

        const { pathname } = location;

        if (pathname !== '/detail') {
            if (small === 0) {
                const payload = {
                    bigCategoryId: big + 1,
                    smallCategoryId: 0,
                };
                dispatchMain({ type: CATEGORY, payload });
            } else {
                if (state.bigCategoryId - 1 === big) {
                    const payload = {
                        bigCategoryId: state.bigCategoryId,
                        smallCategoryId: small,
                    };
                    dispatchMain({ type: CATEGORY, payload });
                } else {
                    const payload = {
                        bigCategoryId: big + 1,
                        smallCategoryId: small,
                    };
                    dispatchMain({ type: CATEGORY, payload });
                }
            }
        } else {
            navigate('/');
            if (small === 0) {
                //return navigate(`/?bigCategoryId=${big + 1}`);
                const payload = {
                    bigCategoryId: big + 1,
                    smallCategoryId: 0,
                };
                dispatchMain({ type: CATEGORY, payload });
            } else {
                //return navigate(`/?bigCategoryId=${big + 1}&smallCategoryId=${small}`);
                const payload = {
                    bigCategoryId: big + 1,
                    smallCategoryId: small,
                };
                dispatchMain({ type: CATEGORY, payload });
            }
        }
    };

    const onClickCategory = useCallback(idx => {
        setOpen(prev => [...prev].map((v, index) => (idx === index ? (v ? false : true) : false)));

        props.setClickSideBar(
            Array.from({
                length: smallCategory[idx].length,
            }).fill(false),
        );
    }, []);

    const onClickToggle = useCallback(() => {
        setCancel(e => !e);
        Cookies.set('sideBarToggle', !cancel);
        const payload = {
            sideBar: !cancel,
        };
        dispatch({ type: SIDEBAR, payload });
    }, [cancel]);

    return (
        <SContainer>
            <div onClick={onClickToggle} className={cancel ? 'toggle active' : 'toggle'}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <SDiv className={cancel ? 'appear' : 'disappear'}>
                <nav>
                    {bigCategory.map((big, idx) => (
                        <div
                            title="MeunContainer"
                            onClick={() => onClickCategory(idx)}
                            aria-expanded={open[idx]}
                            key={idx}
                        >
                            <div title="BigMenu" key={idx}>
                                {big}
                                <span>{alpabet[idx]}</span>
                                <span>{!open[idx] ? <AiOutlinePlus /> : <AiOutlineMinus />}</span>
                            </div>

                            <ul
                                title="smallMenu"
                                aria-expanded={!open[idx]}
                                style={!open[idx] ? { paddingTop: '0' } : { paddTop: '20px' }}
                                onClick={e => e.stopPropagation()}
                            >
                                {smallCategory[idx].map((small, idex) => (
                                    <li
                                        key={idex}
                                        onClick={() => {
                                            sendSmallCate(idx, idex);
                                        }}
                                    >
                                        <span
                                            key={idex}
                                            className={
                                                props.clickSideBar && props.clickSideBar[idex || 0]
                                                    ? 'active'
                                                    : 'inactive'
                                            }
                                        >
                                            {small}
                                        </span>
                                        <span>{`(${idex + 1})`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </SDiv>
        </SContainer>
    );
};

export default Sidebar;
