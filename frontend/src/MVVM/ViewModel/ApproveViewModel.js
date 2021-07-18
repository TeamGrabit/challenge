import React, { useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useApproveState, useApproveDispatch } from '../Model/ApproveModel';
import { useChallengeState } from '../Model/ChallengeModel';
import { useUserState } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';
