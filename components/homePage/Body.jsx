import { useRouter } from "next/router";
import styles from "../../styles/homePage/body.module.css";
import Card from "./Card";
import Footage from "./Footage";
import MainHead from "./MainHead";

function Body({products}){
    const router = useRouter();

return <div className="container">
    <div className={styles.body}>

        <MainHead backgroundColor={"#D2E9E3"}
                control={false}
                image={true}
                button={true}
                text={true}
                product={{...products[Math.floor(Math.random() * products.length - 1)]}}        
        />

        <div className={styles.footages}>
            <div className={styles.side}>
                <Footage backgroundColor="#FCDCDC" height={250}
                        style={{top:-50,left:25}} product={products[12]}
                        aos={"fade-right"}
                />
                <Footage backgroundColor="#FAEACC" height={250}
                        style={{top:20,right:25}} product={products[8]}
                        aos={"fade-right"}
                />
            </div>
            <div className={styles.side}>
               <Footage backgroundColor="#D8DCEE" height={500}
                        style={{bottom:20,right:40}} product={products[7]}
                        aos={"fade-left"}
               />
            </div>
        </div>


        <section>
            <aside>
                 <h2>New</h2>
                <button onClick={()=> router.push("/products")}>Shop Now</button>
            </aside>
            <div className={styles.columns}>
            {products.slice(3,6).map((product,index)=>{
                return <Card product={{...product}} key={index} aos={"zoom-in"} />
            })}
            </div>
        </section>

        <section>
            <aside>
                <h2>Featured</h2>
                <button onClick={()=> router.push("/products")}>Shop Now</button>
            </aside>
            <div className={styles.columns}>
            {products.slice(6,9).map((product,index)=>{
                return <Card product={{...product}} key={index} aos={"zoom-in"} />
            })}
            </div>
        </section>

        <section>
            <aside>
                <h2>More to Love</h2>
                <button onClick={()=> router.push("/products")}>Shop Now</button>
            </aside>
            <div className={styles.columns}>
            {products.slice(9,12).map((product,index)=>{
                return <Card product={{...product}} key={index} aos={"zoom-in"} />
            })}
            </div>
        </section>
        

        <div className="subscribe">
            <MainHead backgroundColor={"#FFEDCD"}
                    text={true}
                    subsucibe={true}
                    product={{
                        name:"Join our news letter",
                        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tristique augue. Curabitur imperdiet gravida purus, eget tincidunt justo rutrum ac. Fusce dignissim ex quis ex tristique euismod. "
                    }}        
            />
        </div>
    </div>
</div>

}

export default Body;