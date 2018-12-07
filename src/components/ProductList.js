import React, {Component} from "react";
import axios from "axios";
import FilterProduct from "../components/FilterProduct.js";




class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productArray:[],
            filteredProducts:[],
            category:"",
           }
           this.sortByPriceAsc=this.sortByPriceAsc.bind(this)
           this.sortByPriceDsc=this.sortByPriceDsc.bind(this)

    }
    componentDidMount(){
        axios.get("http://localhost:5555/api/products")
         .then(response=>{
             //console.log("Product-List",response.data)
             const filteredProducts=response.data.filter((filterbygender)=>{
                
                 return filterbygender.category===this.props.category
                
            })
              this.setState({
                  filteredProducts:filteredProducts,
                  productArray:response.data,
                  category:this.props.category,

                });
         })
         .catch(err=>{
             console.log("ProductList Error", err);
         })
    }

    static getDerivedStateFromProps(nextProps,prevState){
        console.log('nextProps,', nextProps, 'prevState,', prevState)
        if(nextProps.category!==prevState.category){
            const {productArray} = prevState;
            const filteredArray=productArray.filter((filterbygender)=>{
               return filterbygender.category===nextProps.category
            })
            return {
                filteredProducts:filteredArray,
                category:nextProps.category,
            }
        }
        return null;
    } 

    addToCart(productId){
        console.log("productId",productId);
        axios.get("http://localhost:5555/api/addtocart/productId")
     }
   
     
     sortByPriceAsc(){
        const { filteredProducts} = this.state;
         console.log(filteredProducts);
         filteredProducts.sort((a,b)=>{
            if (a.price < b.price)//sort string ascending
              { return 1}
            if (a.price > b.price)
               {return -1}
            else {return 0}  
         })
         console.log(filteredProducts);
          this.setState({
            filteredProducts
         })
    }
     sortByPriceDsc(){
        const { filteredProducts} = this.state;
        console.log(filteredProducts);
        filteredProducts.sort((a,b)=>{
           if (a.price > b.price)//sort string ascending
             { return 1}
           if (a.price < b.price)
              {return -1}
           else {return 0}  
        })
        console.log(filteredProducts);
         this.setState({
           filteredProducts
        })
    }
       
   
    render() { 
        const{filteredProducts}= this.state;
        return ( 
            <section>
                <h1>Choose your product</h1>
                <FilterProduct/>
                <button onClick = {this.sortByPriceDsc}>lowest To highest price</button>
                <button onClick = {this.sortByPriceAsc}>highest To lowest price</button>
                 <ul>
                      {filteredProducts.map(oneProduct=>{
                          return(
                            <li key={oneProduct._id}>
                              <img src={oneProduct.image} alt={oneProduct.name}/>
                              <p>{oneProduct.price}</p>
                              <p>{oneProduct.name}</p>
                              <p>{oneProduct.brand}</p>
                            <button onClick={()=>this.addToCart(oneProduct._id)}>Add to cart</button>
                             
                            </li>
                        )
                     })}
                </ul>
          </section>
         );
      }
}
 
export default ProductList;