import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Popovers from '../../components/bootstrap/Popovers';
import Icon from '../../components/icon/Icon';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import useSortableData from '../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import { changeCallDataLive, loadCallsStart } from '../../redux/ducks/calls';
import Spinner from '../../components/bootstrap/Spinner';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import { loadUsersStart } from '../../redux/ducks/users';
import SingleDateCalls from './SingleDateCalls';

const TotalCallsPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadCallsStart());
		dispatch(loadUsersStart());
	}, [dispatch]);

	return (
		<div className='w-100'>
			<Routes>
				<Route path='' element={<CallsTable />} />
				<Route path=':id' element={<SingleDateCalls />} />
			</Routes>
		</div>
	);
};

const CallsTable = () => {
	const [selectedDate, setSelectedDate] = useState([
		{
			startDate: null,
			endDate: new Date(''),
			key: 'selection',
		},
	]);
	const [rowData, setRowData] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['10']);

	const [selectedUser, setSelectedUser] = useState('Pls Select User');
	const [selectedDateRow, setSelectedDateRow] = useState();

	const { calls, loading, error } = useSelector((state) => state.calls);
	const { users } = useSelector((state) => state.users);

	const { items, requestSort, getClassNamesFor } = useSortableData(
		rowData === undefined ? calls : rowData,
	);
	const ws = useRef(null);

	const dispatch = useDispatch();
// --------------------------------------------------
	useEffect(() => {
		const user_id = '1';
		ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/admin_panel/allcalldetails/${user_id}`);

		ws.current.onopen = (event) => {
			console.log('connection established');
		};

		ws.current.onmessage = function (event) {
			const json = JSON.parse(event.data);
			console.log('hyyy data', json);

			try {
				if (json.data) {
					console.log('Get Json Data....', json.data);

					dispatch(changeCallDataLive(json.data));

					console.log('::::::::::::::::::::::', selectedDate[0].startDate);
					console.log('::::::::::::::::::::::', selectedDate[0].endDate);
					if (
						selectedDate[0].startDate !== null &&
						selectedDate[0].endDate !== 'Invalid Date'
					) {
						console.log('first');
						console.log('callsss update???????', calls);

						const ress = json.data.filter((d) => {
							const abc = new Date(d.date).toDateString();
							const startDate1 = new Date(selectedDate[0].startDate).toDateString();
							const endDate1 = new Date(selectedDate[0].endDate).toDateString();

							return (
								new Date(abc).getTime() >= new Date(startDate1).getTime() &&
								new Date(abc).getTime() <= new Date(endDate1).getTime()
							);
						});

						console.log('ress', ress);
						setRowData(ress);
						setSelectedDateRow(ress);
					}
					if (selectedDateRow === undefined) {
						const ress = json.data.filter((row) => row.userName === selectedUser);

						setRowData(ress);
					}
				}
			} catch (err) {
				console.log('err', err);
			}
		};
		return () => {
			ws.current?.close();
			console.log('connection closed');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, selectedDate, ws, selectedUser]);

    // --------------------------------------------------
    
	console.log('callscallscalls', calls);
	console.log('itemsitemsitems', items);

	const handleSelectedSite = (val) => {
		setSelectedUser(val);

		if (selectedDateRow === undefined) {
			const ress = calls.filter((row) => row.userName === val);

			setRowData(ress);
		} else {
			const ress = selectedDateRow.filter((row) => row.userName === val);

			setRowData(ress);
		}
	};

	const dateRangePicker = (
		<DateRangePicker
			onChange={(item) => {
				const ress = calls.filter((d) => {
					const abc = new Date(d.date).toDateString();
					const startDate1 = new Date(item.selection.startDate).toDateString();
					const endDate1 = new Date(item.selection.endDate).toDateString();

					return (
						new Date(abc).getTime() >= new Date(startDate1).getTime() &&
						new Date(abc).getTime() <= new Date(endDate1).getTime()
					);
				});

				console.log('ress', ress);
				setRowData(ress);
				setSelectedUser('Pls Select User');
				setSelectedDate([item.selection]);
				setSelectedDateRow(ress);
			}}
			showSelectionPreview
			moveRangeOnFirstSelection={false}
			retainEndDateOnFirstSelection={false}
			ranges={selectedDate}
			startDatePlaceholder='Start Date'
			endDatePlaceholder='End Date'
			direction='horizontal'
			rangeColors={[process.env.REACT_APP_PRIMARY_COLOR]}
		/>
	);

	const ResetFilter = () => {
		setSelectedDate([
			{
				startDate: null,
				endDate: new Date(''),
				key: 'selection',
			},
		]);
		setRowData(calls);
		setSelectedDateRow(calls);
		setSelectedUser('Pls Select User');
	};
	console.log('selecteddddd', selectedDate[0].startDate);
	console.log('selecteddddd', selectedDate[0].endDate);
	return (
		<>
			<div
				className={
					loading
						? 'd-flex align-items-center justify-content-center w-100 h-100'
						: 'visually-hidden'
				}
				style={{ position: 'absolute', top: 50, left: 50, opacity: 1, zIndex: 1 }}>
				<Spinner isGrow={false} />
			</div>

			<div style={{ opacity: loading ? 0.5 : 1 }} className='w-100'>
				<PageWrapper>
					<Page container='fluid'>
						<div className='row'>
							<div className='col-xxl-12'>
								<Card>
									<CardHeader>
										<CardLabel icon='ContactPhone' iconColor='info'>
											<CardTitle tag='h4' className='h5'>
												All Calls
											</CardTitle>
										</CardLabel>
										<CardActions>
											<Popovers
												placement='bottom-end'
												className='mw-100 overflow-hidden'
												data-tour='date-range-menu'
												bodyClassName='p-0'
												trigger='click'
												desc={dateRangePicker}>
												<Button
													color='info'
													isLight
													data-tour='date-range'
													icon='DateRange'>
													{(selectedDate[0].startDate &&
														selectedDate[0].endDate) === null
														? 'please select date range'
														: `${moment(
																selectedDate[0].startDate,
														  ).format('MMM Do YY')} - ${moment(
																selectedDate[0].endDate,
														  ).format('MMM Do YY')}`}
												</Button>
											</Popovers>
											<Dropdown isButtonGroup>
												<Button color='primary' isLight icon='Person'>
													{selectedUser}
												</Button>
												<DropdownToggle>
													<Button
														color='primary'
														isLight
														isVisuallyHidden
													/>
												</DropdownToggle>
												<DropdownMenu isAlignmentEnd>
													{users?.map((usr) => {
														return (
															<DropdownItem key={usr?.id}>
																<Button
																	color='link'
																	isActive={
																		usr?.username ===
																		selectedUser
																	}
																	icon='Person'
																	onClick={(e) =>
																		handleSelectedSite(
																			e.target.innerText,
																		)
																	}>
																	{usr?.username}
																</Button>
															</DropdownItem>
														);
													})}
												</DropdownMenu>
											</Dropdown>

											<Button
												icon='RemoveDone'
												color='danger'
												isLight
												onClick={ResetFilter}>
												Reset
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody className='table-responsive'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th
														scope='col'
														onClick={() => requestSort('userName')}
														className='cursor-pointer text-decoration-underline'>
														UserName
														<Icon
															size='lg'
															className={getClassNamesFor('userName')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('date')}
														className='cursor-pointer text-decoration-underline'>
														Date
														<Icon
															size='lg'
															className={getClassNamesFor('date')}
															icon='FilterList'
														/>
													</th>
													<th
														scope='col'
														onClick={() => requestSort('total_calls')}
														className='cursor-pointer text-decoration-underline'>
														Total Calls
														<Icon
															size='lg'
															className={getClassNamesFor(
																'total_calls',
															)}
															icon='FilterList'
														/>
													</th>
													<th
														scope='col'
														onClick={() => requestSort('processed')}
														className='cursor-pointer text-decoration-underline'>
														Processed
														<Icon
															size='lg'
															className={getClassNamesFor(
																'processed',
															)}
															icon='FilterList'
														/>
													</th>
													<th
														scope='col'
														onClick={() => requestSort('pending')}
														className='cursor-pointer text-decoration-underline'>
														Pending
														<Icon
															size='lg'
															className={getClassNamesFor('pending')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('failed')}
														className='cursor-pointer text-decoration-underline'>
														Failed
														<Icon
															size='lg'
															className={getClassNamesFor('failed')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('actions')}
														className='cursor-pointer text-decoration-underline'>
														Actions
														<Icon
															size='lg'
															className={getClassNamesFor('actions')}
															icon='FilterList'
														/>
													</th>
												</tr>
											</thead>
											<tbody>
												{dataPagination(items, currentPage, perPage).map(
													(item) => (
														<tr key={item.id}>
															<td>{item.userName}</td>
															<td>{item.date}</td>
															<td>{item.total_calls}</td>
															<td>{item.processed}</td>
															<td>{item.pending}</td>
															<td>{item.failed}</td>
															<td>
																<Link
																	to={`/calls/${item.userName}_${item.date}`}
																	state={{
																		user_id: item.user_id,
																		date: item.date,
																	}}>
																	<Icon
																		size='lg'
																		icon='Eye'
																		color='success'
																		style={{
																			cursor: 'pointer',
																			marginLeft: '10px',
																		}}
																	/>
																</Link>
															</td>
														</tr>
													),
												)}
											</tbody>
										</table>
									</CardBody>
									<PaginationButtons
										data={items}
										label='No. Of total Calls'
										setCurrentPage={setCurrentPage}
										currentPage={currentPage}
										perPage={perPage}
										setPerPage={setPerPage}
									/>
								</Card>
							</div>
						</div>
					</Page>
				</PageWrapper>
			</div>
		</>
	);
};

export default TotalCallsPage;
