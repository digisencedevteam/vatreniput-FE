import { useState, useEffect } from 'react';
import axiosInstance, { endpoints } from 'src/utils/axios';
import axios from 'src/utils/axios';

type VotingOption = {
  text: string;
};

type Voting = {
  _id: any;
  title: string;
  description: string;
  availableUntil: string;
  thumbnail: string;
  votingOptions: VotingOption[];
};

type UseVotingReturn = {
  isLoading: boolean;
  votings: Voting[] | undefined;
  createVoting: (
    voting: Partial<Voting>
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAllVotings: () => void;
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

  // Popraviti kada ce se raditi Update, treba popraviti instancu i dodati body koji ce se slati

  const createVoting = async (voting: Partial<Voting>) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/votings/',
        voting
      );
      if ([200, 201].includes(response.status)) {
        return { success: true };
      } else {
        return {
          success: false,
          error: `Error creating voting: ${JSON.stringify(response.data)}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error creating voting: ${JSON.stringify(error.message)}`,
      };
    }
  };

  useEffect(() => {
    fetchAllVotings();
  }, []);

  return {
    isLoading,
    votings,
    createVoting,
    fetchAllVotings,
  };
};

export default useVoting;
