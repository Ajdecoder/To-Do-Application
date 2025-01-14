export const PORT_LOCAL = "http://localhost:8000";
export const PORT_PRODUCTON = import.meta.env.VITE_PORT_PRODUCTON;

export const PORT = PORT_PRODUCTON && import.meta.env.MODE === 'production' ? PORT_PRODUCTON : PORT_LOCAL;