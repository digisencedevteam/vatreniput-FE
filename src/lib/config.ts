export const isEnvDevelopment =
  process.env.REACT_APP_ENV === 'development';
export const isEnvProduction =
  process.env.REACT_APP_ENV === 'production';

export let token: any = localStorage.getItem('jwt');

export let options = {
  bearerToken: {
    Authorization: `Bearer ${token}`,
  },
  headers: {
    Authorization: token,
  },
};

export const updateToken = (tokenNew: string) => {
  localStorage.setItem('jwt', tokenNew);
  token = tokenNew;
};

type AtEnvProps = {
  defaultValue: string;
  staging?: string | undefined;
  sandbox?: string | undefined;
  sustaining?: string | undefined;
  development?: string | undefined;
  production?: string | undefined;
};

export const atEnv = ({
  defaultValue,
  development,
  production,
}: AtEnvProps) => {
  if (isEnvDevelopment) {
    return !!development ? development : defaultValue;
  }
  if (isEnvProduction) {
    return !!production ? production : defaultValue;
  }
  return defaultValue;
};

export const apiExpress = atEnv({
  defaultValue: 'http://localhost:3001/',
  development: 'https://vatreniput-be-8083fcaa25e5.herokuapp.com/',
  production: 'https://api.vatreniput.com/',
});

export const getUpdatedHeader = () => {
  options = {
    bearerToken: {
      Authorization: `Bearer ${token}`,
    },
    headers: {
      Authorization: token,
    },
  };
  return options;
};
