import React from "react";
import SearchBar from '../SearchBar/SearchBar'
import styles from './NavBar.module.css';
import { Link } from "react-router-dom";

// const { container, link } = styles;
const { container, link } = styles;

export default function NavBar({onSearch}) {
    return (
        <div className={container}>
            <Link className={link} to='/about'>About</Link>
            <Link className={link} to='/home'>Home</Link>
            <Link className={link} to='/favorites'>Favorites</Link>
            <SearchBar onSearch={onSearch}/>
        </div>
    );
 }