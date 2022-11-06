import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import type { ChainT, Provider, T } from "@/types/index";

import { tokens } from '@/constants/tokens';

type TabPanelProps = {
  children: ReactNode;
  value: T;
  index: T;
};

const TabPanel:FC<TabPanelProps> = (props) => {
  const { children, value, index, ...rest } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && children}
    </div>
  );
};

type AmountProps = {
  /** chain */
  chain: ChainT;
  /** provider */
  provider: Provider;
  /** account */
  account: string;
  /** amount */
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  /** current tab */
  currentTab: T;
  setCurrentTab: Dispatch<SetStateAction<T>>;
};

export const Amount: FC<AmountProps> = ({ chain, provider, account, amount, setAmount, currentTab, setCurrentTab }) => {
  const handleTabChange = (evt: SyntheticEvent, newValue: T) => {
    setCurrentTab(newValue);
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (
      typeof Number(value) !== 'number' ||
      isNaN(Number(value))
    ) {
      return;
    }
    setAmount(value);
  }

  return (
    <>
      {chain.testnet ? (
        <TextField
          required
          id="outlined-required"
          label={`fDAIx/ month`}
          placeholder="0"
          value={amount}
          onChange={onChange}
        />
      ) : (
        <>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="payment token select tabs"
            variant="fullWidth"
          >
            {tokens.map(({ name, superTokenSymbol, icon }) => {
              return (
                <Tab
                  key={superTokenSymbol}
                  sx={{ textTransform: "none" }}
                  icon={
                    <Image
                      src={icon}
                      alt={`${name} icon`}
                      width={24}
                      height={24}
                    />
                  }
                  iconPosition="start"
                  label={superTokenSymbol}
                />
              );
            })}
          </Tabs>
          {tokens.map(({ superTokenSymbol }, index) => {
            return (
              <TabPanel key={superTokenSymbol} value={currentTab} index={index}>
                <TextField
                  required
                  id="outlined-required"
                  label={`${superTokenSymbol} / month`}
                  placeholder="0"
                  value={amount}
                  onChange={onChange}
                />
              </TabPanel>
            );
          })}
        </>
      )}
    </>
  );
};
