const { LOCAL_API_URL, API_URL, ENV } = process.env;

let apiUrl: string;

if (ENV === "dev") {
  apiUrl = LOCAL_API_URL?.toString() as string;
} else {
  apiUrl = API_URL?.toString() as string;
}

export { apiUrl };
