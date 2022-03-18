export function config(){
    return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://shopify-gorega.vercel.app";
}