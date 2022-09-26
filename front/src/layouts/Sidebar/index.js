import { useState, useCallback } from 'react';
import { SContainer, SDiv } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const Sidebar = props => {
	const [cancel, setCancel] = useState(true);
	const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));

	// const navigate = useNavigate();

	//Main에 쿼리스트링 보내기
	const sendSmallCate = (big, small) => {
		// props.setSmallCategoryId(idx + 1);
		// props.setOnSortClick(true);
		props.setSelectBox(true);

		// smallCate index가 0인 경우(전체) / 아닌경우
		// smallCate index가 1이상인 경우에는 bigCateId가 이미 있는경우/없는경우
		//이중 삼항연산자
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
	};

	const onClickCategory = useCallback(idx => {
		setOpen(prev => [...prev].map((v, index) => (idx === index ? (v ? false : true) : false)));
	}, []);

	return (
		<SContainer>
			<div onClick={() => setCancel(e => !e)} className={cancel ? 'toggle active' : 'toggle'}>
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
											sendSmallCate(idx, idex);
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
