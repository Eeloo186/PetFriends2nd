import React, {useState, useEffect} from 'react';
import {Box, useTheme} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {tokens} from "../theme";  // react-router-dom의 Link 추가

const NoticePost = () => {
    const [posts, setPosts] = useState([]);
    const theme = useTheme();
    const {palette} = theme;
    const {primary, common} = palette;
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios
            .get('/api/posts?boardId=1')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('게시글 정보를 가져오지 못했습니다:', error);
            });
    };

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'nickname', headerName: '닉네임', flex: 1},
        {field: 'title', headerName: '제목', flex: 1},
        {field: 'view', headerName: '조회수', flex: 1},
        {field: 'createdAt', headerName: '작성일자', flex: 1},
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Link to="/editor" style={{textDecoration: 'none', color: 'white'}}>
                    공지사항 작성하기
                </Link>
            </Box>
            <Box m="40px 0 0 0" height="38vh" sx={{
                '& .MuiDataGrid-root': {
                    border: 'none',
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none',
                },
                '& .name-column--cell': {
                    color: colors.greenAccent[300],
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: colors.primary[400],
                },
                '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    backgroundColor: colors.blueAccent[700],
                },
                '& .MuiCheckbox-root': {
                    color: `${colors.greenAccent[200]} !important`,
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${colors.grey[100]} !important`,
                },
            }}
            >
                <DataGrid rows={posts} columns={columns}/>
            </Box>
        </Box>
    );
};

export default NoticePost;
