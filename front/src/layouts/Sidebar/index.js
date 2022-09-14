import { useState, useCallback, useRef } from 'react';
import { CgClose } from 'react-icons/cg';
import { SContainer, SDiv } from './styles';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const Sidebar = () => {
	const [cancel, setCancel] = useState(true);
	const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));
	const parentRef = useRef();
	const childRef = useRef();

	const onClickCategory = useCallback(idx => {
		console.log(parentRef.current, childRef.current);

		setOpen(prev => {
			const newArray = [...prev];
			newArray[idx] = !newArray[idx];
			return newArray;
		});
	}, []);

	return (
		<SContainer>
			<div onClick={() => setCancel(e => !e)} className={cancel ? 'toggle' : 'toggle active'}>
				<span className="line"></span>
				<span className="line"></span>
				<span className="line"></span>
			</div>
			<SDiv>
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
									<li key={idex}>
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
