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
  isVoted: boolean;
};

type UserVotedVoting = Voting & {
  userVotedOptionId: string;
  votingId: string;
  topOption: string;
  votes: number;
};

type UseVotingReturn = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  votings: Voting[] | undefined;
  userVotedVotings: UserVotedVoting[];
  createOrUpdateVoting: (
    voting: Partial<Voting>,
    votingId?: string
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAllVotings: () => void;
  fetchUserVotedVotingsWithTopOption: (userId: string) => Promise<void>;
  submitVote: (votingId: string, votingOptionId: string) => Promise<void>;
  deleteVoting: (votingId: string) => Promise<void>;
  updateVoting: (voting: Partial<Voting>, votingId: string) => Promise<void>;
  fetchVotingById: (votingId: string) => Promise<Partial<Voting> | null>;
  fetchVotingResult: (
    votingId: string
  ) => Promise<Partial<VotingResultStat> | null>;
  error: string;
};

const useVoting = (): UseVotingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [votings, setVotings] = useState<Voting[]>();
  const [userVotedVotings, setUserVotedVotings] = useState<UserVotedVoting[]>(
    []
  );
  const [error, setError] = useState<string>('');

  const handleError = (
    error: { response: { data: { message: string } } },
    defaultMessage: string
  ) => {
    const message = error.response?.data?.message || defaultMessage;
    setError(message);
  };

  const fetchAllVotings = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoints.votings.all}`);
      setVotings(response.data);
    } catch (error) {
      setVotings([]);
      handleError(error, 'Greška pri dohvaćanju svih glasanja.');
    }
    setIsLoading(false);
  };

  const fetchUserVotedVotingsWithTopOption = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/votings/user/${userId}/top-votes`
      );
      setUserVotedVotings(response.data);
    } catch (error) {
      handleError(error, 'Greška pri dohvaćanju glasova korisnika.');
    }
    setIsLoading(false);
  };

  const createOrUpdateVoting = async (
    voting: Partial<Voting>,
    votingId?: string
  ) => {
    const votingToSend = { ...voting };
    let response;

    try {
      if (votingId) {
        response = await axiosInstance.put(
          `/votings/${votingId}`,
          votingToSend
        );
      } else {
        response = await axiosInstance.post('/votings/', votingToSend);
      }

      if ([200, 201].includes(response.status)) {
        return { success: true };
      } else {
        return {
          success: false,
          error: JSON.stringify(response.data),
        };
      }
    } catch (error) {
      return {
        success: false,
        error: JSON.stringify(error.message),
      };
    }
  };

  const fetchVotingById = async (
    votingId: string
  ): Promise<Partial<Voting> | null> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${endpoints.votings.all}${votingId}`
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      handleError(error, 'Greška pri dohvaćanju detalja glasanja.');
      setIsLoading(false);
      return null;
    }
  };

  const fetchVotingResult = async (
    votingId: string
  ): Promise<VotingResultStat | null> => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${endpoints.votings.all}${votingId}/results`
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      handleError(error, 'Greška pri dohvaćanju rezultata glasanja.');
      setIsLoading(false);
      return null;
    }
  };

  const updateVoting = async (voting: Partial<Voting>, votingId: string) => {
    try {
      await axiosInstance.put(`${endpoints.votings.submitAndDelete}`, {
        voting,
        votingId,
      });
    } catch (error) {
      handleError(error, 'Greška pri ažuriranju  glasanja.');
    }
  };

  const submitVote = async (votingId: string, votingOptionId: string) => {
    try {
      await axiosInstance.post(`${endpoints.votings.submitAndDelete}`, {
        votingId,
        votingOptionId,
      });
    } catch (error) {
      handleError(error, 'Greška pri slanju glasanja.');
    }
  };

  const deleteVoting = async (votingId: string) => {
    try {
      await axiosInstance.delete(`${endpoints.votings.all}${votingId}`);
      setVotings(
        (prevVotings) =>
          prevVotings?.filter((voting) => voting._id !== votingId)
      );
    } catch (error) {
      handleError(error, 'Greška prilikom brisanja glasanja');
    }
  };

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
    fetchVotingResult,
    userVotedVotings,
    fetchUserVotedVotingsWithTopOption,
    error,
  };
};

export default useVoting;
