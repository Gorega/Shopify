export function config(){
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.domian.com";
}