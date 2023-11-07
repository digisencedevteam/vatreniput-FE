import { useState } from 'react';
import { VotingOption, VotingResultStat } from 'src/types';
import axiosInstance, { endpoints } from 'src/utils/axios';

type Voting = {
  _id: string;
  title: string;
  description: string;
  availableUntil: string;
  thumbnail: string;
  votingOptions: VotingOption[];
  isVoted: boolean
};

type UseVotingReturn = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  votings: Voting[] | undefined;
  createOrUpdateVoting: (
    voting: Partial<Voting>,
    votingId?: string
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAllVotings: () => void;
  submitVote: (votingId: string, votingOptionId: string) => Promise<void>;
  deleteVoting: (votingId: string) => Promise<void>;
  updateVoting: ( voting: Partial<Voting>, votingId: string) => Promise<void>;
  fetchVotingById: (votingId: string) => Promise<Partial<Voting> | null>;
  fetchVotingResult: (votingId: string) => Promise<Partial<VotingResultStat> | null>;
};

const useVoting = (): UseVotingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [votings, setVotings] = useState<Voting[]>();

  const fetchAllVotings = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoints.votings.all}`);
      setVotings(response.data);
    } catch (error) {
      setVotings([]);
    }
    setIsLoading(false);
  };

  const createOrUpdateVoting = async (voting: Partial<Voting>, votingId?: string) => {
    const votingToSend = { ...voting };
    let response;
    
    try {
      if (votingId) {
        response = await axiosInstance.put(`/votings/${votingId}`, votingToSend);
      } else {
        response = await axiosInstance.post('/votings/', votingToSend);
      }
  
      if ([200, 201].includes(response.status)) {
        return { success: true };
      } else {
        return {
          success: false,
          error: `Error ${votingId ? 'updating' : 'creating'} voting: ${JSON.stringify(response.data)}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error ${votingId ? 'updating' : 'creating'} voting: ${JSON.stringify(error.message)}`,
      };
    }
  };

  const fetchVotingById = async (votingId: string): Promise<Partial<Voting> | null> => { 
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoints.votings.all}${votingId}`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching voting data by ID:', error);
      setIsLoading(false);
      return null;
    }
  };

  const fetchVotingResult = async (votingId: string): Promise<VotingResultStat | null>  => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoints.votings.all}${votingId}/results`)
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error fetching result data by ID:', error);
      setIsLoading(false);
      return null;
    }
  }

  const updateVoting = async (voting: Partial<Voting>, votingId: string) => {
    try {
      await axiosInstance.put(
        `${endpoints.votings.submitAndDelete}`,
        {voting, votingId},
      );
    } catch (error) {
      console.error(error)
    }
  }

  const submitVote = async (votingId: string, votingOptionId: string) => {
    try {
      await axiosInstance.post(`${endpoints.votings.submitAndDelete}`,
      {votingId, votingOptionId})
    }
    catch(error){
      console.error(error)
    }
  }

  const deleteVoting = async (votingId: string) => {
    try {
      await axiosInstance.delete(
        `${endpoints.votings.all}${votingId}`,
      );
      setVotings(prevVotings => prevVotings?.filter(voting => voting._id !== votingId)); 
    } catch (error) {
      console.error(error)
    }
  }

  return {
    isLoading,
    votings,
    setIsLoading,
    createOrUpdateVoting,
    fetchAllVotings,
    submitVote,
    deleteVoting,
    updateVoting,
    fetchVotingById,
    fetchVotingResult
  };
};

export default useVoting;
