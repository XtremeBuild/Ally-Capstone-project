import axiosInstance from '../axiosInstance';
import { NGROK_LINK } from '../const';

export const updatePromise = (threadId: string | undefined, email: string | null) =>
  axiosInstance.get(
    `${NGROK_LINK}/update?thread_id=${threadId}&email=${email}`,
    {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }
  );

export const consensusPromise = (threadId: string | undefined) =>
  axiosInstance.get(
    `${NGROK_LINK}/thread/get_full_consensus?thread_id=${threadId}`,
    {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }
  );

export const titlePromise = (threadId: string | undefined) =>
  axiosInstance.get(`${NGROK_LINK}/title?thread_id=${threadId}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });

export const emailSummaryPromise = (threadId: string | undefined) =>
  axiosInstance.get(`${NGROK_LINK}/email_summary?thread_id=${threadId}`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });

export const fullConsensusPromise = (threadId: string | undefined) => {
  return axiosInstance.get(`${NGROK_LINK}/thread/full_consensus?thread_id=${threadId}`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
}

export const MuiTablePromise = (threadId: string | undefined) => {
  return axiosInstance.get(`${NGROK_LINK}/thread/get_consensus?thread_id=${threadId}`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });
}