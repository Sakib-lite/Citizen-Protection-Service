/* eslint-disable import/no-anonymous-default-export */
import { useSnackbar } from 'notistack';

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg) {
    this.toast(msg, 'success');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  error(msg) {
    this.toast(msg, 'error');
  },
  toast(msg, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant,    autoHideDuration: 1500 });
  },
};

// import Snackbar from './notistick/Snackbar';
//  Snackbar.success(succesMessage);


/*
 for typescript
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
import React from 'react'

let useSnackbarRef: WithSnackbarProps
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export default {
  success(msg: string) {
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant })
  }
}
*/