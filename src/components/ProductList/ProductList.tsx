  import { useContext, useEffect, useState } from "react";
  import { ProductContext } from "../../context/Product";
  import axios from "axios";

  const ProductList = () => {
    const { state, dispatch } = useContext(ProductContext);

    useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/products');
          dispatch({ type: 'product/fetch', payload: data });
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);

    const addProduct = async (product: any) => {
      try {
        const { data } = await axios.post('http://localhost:3000/products', product);
        dispatch({ type: 'product/add', payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    const removeProduct = async (id: any) => {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        dispatch({ type: 'product/remove', payload: id });
      } catch (error) {
        console.log(error);
      }
    };

    const updateProduct = async (product: any) => {
      try {
        const { data } = await axios.patch(`http://localhost:3000/products/${product.id}`, product);
        dispatch({ type: 'product/update', payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    const Form = () => {
      const [valueInput, setValueInput] = useState<string>("");

      const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!valueInput) return;
        try {
          await addProduct({name: valueInput})
        } catch (error) {
          console.log(error);
        }
        const form = e.target as HTMLFormElement;
        form.reset();
        setValueInput("");
      };

      const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value);
      };

      return (
        <form onSubmit={onHandleSubmit}>
          <input onChange={onHandleChange} placeholder="Tên sản phẩm" />
          <button>Thêm</button>
        </form>
      );
    };

    return (
      <div>
        {state.products.map((item: any) => (
          <div key={item.id}>
            {item.name}
            <button onClick={() => removeProduct(item.id)}>Xoá</button>
          </div>
        ))}
        <Form />
        <button onClick={() => updateProduct({ id: 4, name: "Sản phẩm đã cập nhật", price: 400 })}>Cập nhật</button>
      </div>
    );
  };

  export default ProductList;
