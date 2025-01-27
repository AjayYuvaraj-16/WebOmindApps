'use client';
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    marginTop: 0,
    marginBottom: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  '&.MuiAccordionDetails-root': {
    padding: '0px 16px',
  },
}));

const MobileHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeAccordions, setActiveAccordions] = useState([false, false, false]);

  const menuItems = [
    { title: 'Home', link: '/' },
    {
      title: 'Payment',
      link: '/payment',
      subMenu: [
        {
          title: 'Payment Page',
          link: '/resources/developers',
          subMenu: [
            { title: 'Payment Gateway', link: '/resources/developers/docs' },
            { title: 'Payment Links', link: '/resources/developers/docs' },
            { title: 'Payment Button', link: '/resources/developers/docs' },
            { title: 'QR Codes', link: '/resources/developers/docs' },
            { title: 'Smart Collect', link: '/resources/developers/integration' },
            { title: 'Invoices', link: '/resources/developers/onboarding' },
          ],
        },
        {
          title: 'Payout',
          link: '/resources/solutions',
          subMenu: [
            { title: 'Vendor Payment', link: '/resources/developers/docs' },
            { title: 'Payouts', link: '/resources/developers/integration' },
            { title: 'Payout Links', link: '/resources/developers/onboarding' },
          ],
        },
      ],
    },
    {
      title: 'Banking',
      link: '/banking',
      subMenu: [
        { title: 'Current Account', link: '/resources/solutions' },
        { title: 'Escrow + Account', link: '/resources/solutions' },
        { title: 'Tax Payment', link: '/resources/solutions' },
      ],
    },
    { title: 'Payroll', link: '/payroll' },
    {
      title: 'Resources',
      link: '/resources',
      subMenu: [
        {
          title: 'Developers',
          link: '/resources/developers',
          subMenu: [
            { title: 'Developer Docs', link: '/resources/developers/docs' },
            { title: 'Integration', link: '/resources/developers/integration' },
            { title: 'Onboarding APIs', link: '/resources/developers/onboarding' },
          ],
        },
        { title: 'Solutions', link: '/resources/solutions' },
      ],
    },
    {
      title: 'Pages',
      link: '/pages',
      subMenu: [
        { title: 'About Us', link: '/resources/solutions' },
        { title: 'FAQ', link: '/resources/solutions' },
        { title: 'Contact Us', link: '/resources/solutions' },
      ],
    },
    { title: 'Sign In', link: '/signin' },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleAccordionChange = (index, subIndex, subSubIndex) => {
    setActiveAccordions((prevState) => {
      const newState = [...prevState];
      if (subSubIndex !== -1) {
        newState[2] = newState[2] === subSubIndex ? false : subSubIndex;
      } else if (subIndex !== -1) {
        newState[1] = newState[1] === subIndex ? false : subIndex;
      } else {
        newState[0] = newState[0] === index ? false : index;
      }
      return newState;
    });
  };

  const handleMenuItemClick = (link) => {
    // Example for navigation or link handling
    if (link) {
      window.location.href = link;
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <div
        onClick={handleDrawerToggle}
        className="bg-[#ff6400] shadow-md px-3 py-2 w-12 h-8 rounded-sm flex flex-col justify-around items-center"
      >
        <span className="bg-white h-0.5 w-full"></span>
        <span className="bg-white h-0.5 w-full"></span>
        <span className="bg-white h-0.5 w-full"></span>
      </div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          style: {
            width: '80vw',
          },
        }}
      >
        <div className="flex justify-end items-center p-4">
          <IconButton onClick={handleDrawerToggle}>X</IconButton>
        </div>

        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subMenu ? (
                <Accordion
                  expanded={activeAccordions[0] === index}
                  onChange={() => handleAccordionChange(index, -1, -1)}
                >
                  <AccordionSummary>
                    <ListItemButton onClick={() => handleMenuItemClick(item.link)}>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ p: 0 }} className="divide-y">
                      {item.subMenu.map((subItem, subIndex) => (
                        <React.Fragment key={subIndex}>
                          {subItem.subMenu ? (
                            <Accordion
                              expanded={activeAccordions[1] === subIndex}
                              onChange={() => handleAccordionChange(index, subIndex, -1)}
                            >
                              <AccordionSummary>
                                <ListItemButton onClick={() => handleMenuItemClick(subItem.link)}>
                                  <ListItemText primary={subItem.title} />
                                </ListItemButton>
                              </AccordionSummary>
                              <AccordionDetails>
                                <List sx={{ py: 0 }} className="divide-y">
                                  {subItem.subMenu.map((subSubItem, subSubIndex) => (
                                    <ListItem key={subSubIndex} sx={{ py: 0 }}>
                                      <ListItemButton
                                        className="py-1"
                                        onClick={() => handleMenuItemClick(subSubItem.link)}
                                      >
                                        <ListItemText primary={subSubItem.title} />
                                      </ListItemButton>
                                    </ListItem>
                                  ))}
                                </List>
                              </AccordionDetails>
                            </Accordion>
                          ) : (
                            <ListItem sx={{ py: 0 }}>
                              <ListItemButton
                                className="py-1"
                                onClick={() => handleMenuItemClick(subItem.link)}
                              >
                                <ListItemText primary={subItem.title} />
                              </ListItemButton>
                            </ListItem>
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <ListItem sx={{ py: 0 }} className="border-t border-solid">
                  <ListItemButton onClick={() => handleMenuItemClick(item.link)}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileHeader;
