import {Select, MenuItem, FormControl} from '@mui/material';
import {ChainInfo, ChainType} from '@starkware-industries/commons-js-enums';
import {openInNewTab} from '@starkware-industries/commons-js-utils';
import React from 'react';

import {ReactComponent as CollapseIcon} from '../../../assets/svg/icons/collapse.svg';
import {ReactComponent as SelectedIcon} from '../../../assets/svg/icons/selected.svg';
import {APP_URL_GOERLI, APP_URL_MAINNET} from '../../../config/constants';
import {useEnvs} from '../../../hooks';
import {ChainSelectTheme} from './ChainSelect.theme';

export const ChainSelect = () => {
  const {SUPPORTED_L2_CHAIN_ID} = useEnvs();
  const urlsMap = {
    [ChainType.L2.MAIN]: APP_URL_MAINNET,
    [ChainType.L2.GOERLI]: APP_URL_GOERLI
  };

  const handleChange = event => {
    openInNewTab(urlsMap[event.target.value]);
  };

  const renderItems = () => {
    return Object.values(ChainType.L2).map(chainName => {
      return (
        <MenuItem key={chainName} value={chainName}>
          {ChainInfo.L2[chainName].CHAIN}
          {chainName === SUPPORTED_L2_CHAIN_ID && (
            <div style={{paddingLeft: '20px'}}>
              <SelectedIcon />
            </div>
          )}
        </MenuItem>
      );
    });
  };

  return (
    <ChainSelectTheme>
      <FormControl size={'small'}>
        <Select
          IconComponent={CollapseIcon}
          renderValue={chainName => ChainInfo.L2[chainName].CHAIN}
          value={SUPPORTED_L2_CHAIN_ID}
          onChange={handleChange}
        >
          {renderItems()}
        </Select>
      </FormControl>
    </ChainSelectTheme>
  );
};
