import { useState, useCallback } from 'react';
import { SContainer, SDiv } from './styles';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Cookies from 'js-cookie';
import { SIDEBAR, useGlobalDispatch } from 'context/GlobalContext';

const Sidebar = props => {
    const dispatch = useGlobalDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // const [cancel, setCancel] = useState(true);
    const [cancel, setCancel] = useState(Cookies.get('sideBarToggle') === 'false' ? false : true);
    const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));

    // const navigate = useNavigate();

    //Main에 쿼리스트링 보내기
    const sendSmallCate = (big, small) => {
        // smallCate index가 0인 경우(전체) / 아닌경우
        // smallCate index가 1이상인 경우에는 bigCateId가 이미 있는경우/없는경우
        //이중 삼항연산자
        // props.setClickCate(
        //     Array.from({
        //         length: smallCategory[big + 1].length,
        //     }).fill(false),
        // );
        props.setClickCate([]);

        const { pathname } = location;

        if (pathname !== '/detail') {
            small === 0
                ? props.setFilterVal(() => {
                      return { bigCategoryId: big + 1 };
                  })
                : props.filterVal.bigCategoryId - 1 === big
                ? props.setFilterVal(prev => {
                      return { ...prev, smallCategoryId: small };
                  })
                : props.setFilterVal(() => {
                      return { bigCategoryId: big + 1, smallCategoryId: small };
                  });
        } else {
            return navigate(`/products?bigCategoryId=${big + 1}&smallCategoryId=${small}`);
        }

        console.log(props.clickCate);
    };

    const onClickCategory = useCallback(idx => {
        setOpen(prev => [...prev].map((v, index) => (idx === index ? (v ? false : true) : false)));
    }, []);

    const onClickToggle = useCallback(() => {
        setCancel(e => !e);
        Cookies.set('sideBarToggle', !cancel);
        console.log(cancel);
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
                                <span>
                                    {!open[idx] ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />}
                                </span>
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
                                        <span key={idex}>{small}</span>
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
