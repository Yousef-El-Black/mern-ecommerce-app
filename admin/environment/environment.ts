const { LOCAL_API_URL, API_URL, ENV } = process.env;

let apiUrl: string;

if (ENV === "dev") {
  apiUrl = LOCAL_API_URL?.toString() as string;
} else if (ENV === "prod") {
  apiUrl = API_URL?.toString() as string;
} else {
  apiUrl = "http://localhost:8080/";
}
apiUrl = "http://localhost:8080/";

export { apiUrl };
