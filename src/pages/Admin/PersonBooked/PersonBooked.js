import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListUserBookedAction } from '../../../redux/actions/UserAction';
import moment from 'moment';
import { Table, Badge, Menu, Dropdown, Space ,Tag} from 'antd';
import { DownOutlined } from '@ant-design/icons';


export default function PersonBooked(props) {
    const { infoBookedUser, isLoading } = useSelector(state => state.UserReducer);
    const taiKhoan = props.match.params.taiKhoan;
    // console.log('loading',loading);

    console.log('loading', infoBookedUser);
    const dataT = {
        "taiKhoan": `${taiKhoan}`
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'RESET_LOADING_USER' });
        dispatch(getListUserBookedAction(dataT));
    }, []);
    const menu = (
        <Menu>
            <Menu.Item>Action 1</Menu.Item>
            <Menu.Item>Action 2</Menu.Item>
        </Menu>
    );
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const listChar = [
        { number: 16, char: 'A' },
        { number: 32, char: 'B' },
        { number: 48, char: 'C' },
        { number: 64, char: 'D' },
        { number: 80, char: 'E' },
        { number: 96, char: 'F' },
        { number: 112, char: 'G' },
        { number: 128, char: 'H' },
        { number: 144, char: 'I' },
        { number: 160, char: 'J' },
    ]
    const setNameSeat = (index) => {
        let result;
        for (let i = 0; i < listChar.length; i++) {
            if (index <= listChar[i].number && index >= listChar[i].number - 15) {
                let h = 0;
                let indexSeat;
                for (let j = listChar[i].number - 16; j <= listChar[i].number; j++) {
                    if (index == j) {
                        indexSeat = h;
                        break;
                    }
                    h++;
                }
                if (indexSeat < 10) {
                    result = ` ${listChar[i].char}0${indexSeat}`;
                } else {
                    result = ` ${listChar[i].char}${indexSeat}`;
                }
            }
        }
        return result;
    }
    function NestedTable() {
        const expandedRowRender = (row) => {
            const columns = [
                { title: 'GH???', dataIndex: 'tenGhe', key: 'tenGhe',render:(text,index)=>(
                    <Tag color="blue" key={index}>
                            {setNameSeat(text)}
                        </Tag>
                )},
                { title: 'M?? H??? TH???NG R???P', dataIndex: 'maHeThongRap', key: 'maHeThongRap' },
                { title: 'T??N H??? TH???NG R???P', dataIndex: 'tenHeThongRap', key: 'tenHeThongRap' },
                { title: 'T??N C???M R???P', dataIndex: 'tenCumRap', key: 'tenCumRap' },
            ];

            const data = [];
            for (let i = 0; i < 3; ++i) {
                data.push({
                    key: i,
                    date: '2014-12-24 23:12:00',
                    name: 'This is production name',
                    upgradeNum: 'Upgraded: 56',
                });
            }
            const datas = [];
            for (let i = 0; i < infoBookedUser.thongTinDatVe.length; i++) {
                let dataA = [];
                for (let j = 0; j < infoBookedUser.thongTinDatVe[i].danhSachGhe.length; j++) {
                    dataA.push(infoBookedUser.thongTinDatVe[i].danhSachGhe[j]);
                }
                datas[i] = dataA;
            }
            let dataEx ;
            for(let i = 0; i < infoBookedUser.thongTinDatVe.length; i++){
                if(i == row.key){
                    dataEx = datas[i];
                }
            }

            return <Table columns={columns} dataSource={dataEx} pagination={false} />;
        };

        const columns = [
            { title: 'T??N PHIM', dataIndex: 'tenPhim', key: 'tenPhim', with: '350' },
            { title: 'NG??Y ?????T', dataIndex: 'ngayDat', key: 'ngayDat', with: '200' },
            { title: 'GI?? V??', dataIndex: 'giaVe', key: 'giaVe', render: (text) => (<span>{numberWithCommas(text)} VN??</span>), with: '150' },
            { title: 'TH???I L?????NG PHIM', dataIndex: 'thoiLuongPhim', key: 'thoiLuongPhim', render: (text) => (<span>{text} P</span>), with: '100' },
        ];

        const data = [];
        for (let i = 0; i < infoBookedUser?.thongTinDatVe?.length; i++) {
            data.push({
                key: i,
                tenPhim: infoBookedUser.thongTinDatVe[i].tenPhim,
                ngayDat: moment(infoBookedUser.thongTinDatVe[i].ngayDat).format('DD/MM/YYYY hh:mm:ss'),
                giaVe: infoBookedUser.thongTinDatVe[i].giaVe,
                thoiLuongPhim: infoBookedUser.thongTinDatVe[i].thoiLuongPhim,
            });
        }
        return (
            <Table
                loading={isLoading}
                bordered
                className="components-table-demo-nested"
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
            />
        );
    }
    return (
        <div>
            <div className="adminManage">
                {/* <div className="title" style={{backgroundColor:`${fSetColor(maHeThongRap)}`}}>DANH S??CH C??C R???P C???A C???M R???P {fGetNameOfCinema().toUpperCase()} </div> */}
                <div className="title" >TH??NG TIN ?????T V??  C???A {taiKhoan} </div>
            </div>
            <NestedTable />
        </div>
    )
}
