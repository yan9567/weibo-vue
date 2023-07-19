import { ElMessage, ElNotification } from 'element-plus'


/**
 * @description:
 * @param {*} message
 * @param {*} type
 * @param {*} showClose
 * @param {*} duration
 * @return {*}
 */
export const MessageFun = (message: string, type: 'success' | 'warning' | 'info' | 'error', showClose = false, duration = 2000) => {
    ElMessage({
      message,
      type,
      showClose,
      duration,
    });
  };
  
  /**
   * @description:
   * @param {*} message
   * @param {*} title
   * @param {*} type
   * @param {*} showClose
   * @param {*} duration
   * @return {*}
   */
  export const NotificationFun = (message: string, title: string, type: 'success' | 'warning' | 'info' | 'error', showClose = true, duration = 2000) => {
    ElNotification({
      message,
      title,
      type,
      showClose,
      duration,
    });
};