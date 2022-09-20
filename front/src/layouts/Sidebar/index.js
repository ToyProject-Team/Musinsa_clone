import { useState, useCallback } from 'react';
import { SContainer, SDiv } from './styles';
import { Link } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const Sidebar = props => {
	const [cancel, setCancel] = useState(true);
	const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));
	const [xPosition, setX] = useState();

	const toggleMenu = () => {
		if (xPosition > 0) {
			setX(0);
			setCancel(true);
		} else {
			setX();
			setCancel(false);
		}
	};

	//Main으로 idx값 보내는 함수1
	const sendBigCate = idx => {
		props.setBigCategoryId(idx + 1);
		//다른 params 1로 리셋
		props.setSmallCategoryId(1);
		props.setPage(1);
	};
	//Main으로 idx값 보내는 함수2
	const sendSmallCate = idx => {
		props.setSmallCategoryId(idx + 1);
	};

	const onClickCategory = useCallback(idx => {
		setOpen(prev => {
			const newArray = [...prev];
			newArray[idx] = !newArray[idx];
			return newArray;
		});
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
							<div title="BigMenu" key={idx} onClick={() => sendBigCate(idx)}>
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
											sendSmallCate(idex);
										}}
									>
										{small}
										<span>{`(${idex})`}</span>
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
