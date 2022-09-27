import { useState, useCallback } from 'react';
import { SContainer, SDiv } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';
import Cookies from 'js-cookie';

const Sidebar = props => {
	// const [cancel, setCancel] = useState(true);
	const [cancel, setCancel] = useState(Cookies.get('sideBarToggle') === 'false' ? false : true);
	const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));

	const navigate = useNavigate();

	const onClickToggle = useCallback(() => {
		setCancel(e => !e);
		Cookies.set('sideBarToggle', !cancel);
	}, [cancel]);

	//Main으로 idx값 보내고, url에 쿼리스트링 추가하는 함수
	const sendSmallCate = idx => {
		props.setSmallCategoryId(idx + 1);
		props.setOnSortClick(true);
		props.setSelectBox(true);
		navigate({
			pathname: `/products`,
			search: `bigCategoryId=${props.bigCategoryId}&smallCategoryId=${idx}`,
		});
	};

	const sendBigCate = () => {
		props.setDetect(!props.detect);
		navigate({
			pathname: `/products`,
			search: `bigCategoryId=${props.bigCategoryId}`,
		});
	};

	const onClickCategory = useCallback(idx => {
		setOpen(prev => [...prev].map((v, index) => (idx === index ? (v ? false : true) : false)));

		//Category클릭시 Main에 Category Id전달
		props.setOnSortClick(false);
		props.setSelectBox(false);
		props.setBigCategoryId(idx + 1);
	}, []);

	return (
		<SContainer>
			<div onClick={onClickToggle} className={cancel ? 'toggle active' : 'toggle'}>
				<span className="line"></span>
				<span className="line"></span>
				<span className="line"></span>
			</div>
			<SDiv className={cancel ? 'appear' : 'disappear'}>
				<Link to="/">
					전체<span>All</span>
				</Link>
				<nav>
					{bigCategory.map((big, idx) => (
						<div
							title="MeunContainer"
							onClick={() => onClickCategory(idx)}
							aria-expanded={open[idx]}
						>
							<div title="BigMenu" key={idx}>
								{big}
								<span>{alpabet[idx]}</span>
								<span>{!open[idx] ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />}</span>
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
											idex === 0 ? sendBigCate() : sendSmallCate(idex);
										}}
									>
										<span>{small}</span>
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
