import React, { PureComponent } from 'react'
import logo from '../../../assets/logo.png'
import { NavLink } from "react-router-dom"
import { FiHome,FiUsers,FiLogOut } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import {BsCardChecklist} from 'react-icons/bs'
import styled from 'styled-components';

export class sideMenu extends PureComponent {
  render() {
    function logout(){
       
    }
      const Sidebar=styled.div`
      background-color: #fff;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      padding: 0px 14px;
      float: left;
      position: fixed;
      height: 100vh;
      `;
      const IMG=styled.div`
      background-image: url(${props => props.img});
      width: 43px;
      height: 24px;
      background-size: contain;
      background-repeat: no-repeat;
      margin:auto;
      `;
      const LogoImg=styled.div`

      margin-bottom:100px;
      margin-top:46px;
      `;
      const LinkTag=styled.h5`
      color: #563bff;
      position: absolute;
      top:5px;
      display:none;
      border-radius: 20px;
      margin: 0px;
      padding: 10px 12px;
      left: 70px;
      background: #fff;
      `;
  
      const LinkList= styled.li`
      margin-bottom: 50px;
    width: fit-content;
    position: relative;
    
    &:hover ${LinkTag} {
      display: block;
    }
      `
      const SideNavLink= styled.ul`
      padding:0px;
      list-style:none;
      `
    return (
        <Sidebar>
            <LogoImg className='logoImg'>
                <IMG img={logo} />
            </LogoImg>
            <SideNavLink className='sidebarLinks'>
                <LinkList>
                    <NavLink  className='sideNavlink  block' to='home' >
                        <FiHome/>
                        <LinkTag>Home</LinkTag>
                    </NavLink>
                </LinkList>
                <LinkList>
                    <NavLink className='sideNavlink  block' to='tests?page=1' >
                        <FaRegStickyNote/>
                        <LinkTag>Tests</LinkTag>
                    </NavLink>
                </LinkList>
                <LinkList>
                    <NavLink className='sideNavlink  block' to='applied' >
                        <FaRegStickyNote/>
                        <LinkTag>Applied Test</LinkTag>
                    </NavLink>
                </LinkList>
                <LinkList>
                    <NavLink className='sideNavlink  block' to='results' >
                        <BsCardChecklist/>
                        <LinkTag>Result</LinkTag>
                    </NavLink>
                </LinkList>
            </SideNavLink>
            <div className='logOut'>
            <div className='logoutBtn' onClick={logout}>
                        <FiLogOut/>
                        <LinkTag>Logout</LinkTag>
                </div>
            </div>
        </Sidebar>
    )
  }
}

export default sideMenu