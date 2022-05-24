import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const RestauranteContext = createContext();

// eslint-disable-next-line react/prop-types
const RestauranteProvider = ({ children }) => {
	const [categorias, setCategorias] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState({});
	const [producto, setProducto] = useState({});
	const [modal, setModal] = useState(false);
	const [pedido, setPedido] = useState([]);
	const [nombre, setNombre] = useState('');
	const [total, setTotal] = useState(0);

	const router = useRouter();

	const obtenerCategorias = async () => {
		const { data } = await axios('api/categorias');
		setCategorias(data);
	};

	useEffect(() => {
		obtenerCategorias();
	}, []);

	useEffect(() => {
		setCategoriaActual(categorias[0]);
	}, [categorias]);

	useEffect(() => {
		const nuevoTotal = pedido.reduce(
			(total, producto) => producto.precio * producto.cantidad + total,
			0
		);
		setTotal(nuevoTotal);
	}, [pedido]);

	const handleButton = id => {
		const categoria = categorias.filter(cat => cat.id === id);
		setCategoriaActual(categoria[0]);
		router.push('/');
	};

	const handleSetProducto = producto => {
		setProducto(producto);
	};

	const hanledChangeModal = () => {
		setModal(!modal);
	};

	const hanledAgregarPedido = ({ categoriaId, ...producto }) => {
		if (pedido.some(productoState => productoState.id === producto.id)) {
			const pedidoActualizado = pedido.map(productoState =>
				productoState.id === producto.id ? producto : productoState
			);
			setPedido(pedidoActualizado);
			toast.success('Actualizado Correctamente', { position: 'bottom-right' });
		} else {
			setPedido([...pedido, producto]);
			toast.success('Agregado al Pedido', { position: 'bottom-right' });
		}
		setModal(false);
	};

	const hanledEditarCantidad = id => {
		const productoActualizar = pedido.filter(producto => producto.id === id);
		setProducto(productoActualizar[0]);
		setModal(!modal);
	};

	const eliminarProducto = id => {
		const productoEliminar = pedido.filter(pedido => pedido.id !== id);
		setPedido(productoEliminar);
		toast.info('Se Elimino Correctamente', { position: 'bottom-right' });
	};

	const colocarOrden = async e => {
		e.preventDefault();
		try {
			await axios.post('/api/ordenes', {
				pedido,
				nombre,
				total,
				fecha: Date.now().toString(),
			});

			// resetear app
			setCategoriaActual(categorias[0]);
			setPedido([]);
			setNombre('');
			setTotal(0);
			toast.success('Pedido Realizado Correctamente', {
				position: 'bottom-right',
			});
			setTimeout(() => {
				router.push('/');
			}, 3000);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<RestauranteContext.Provider
			value={{
				categorias,
				categoriaActual,
				producto,
				modal,
				pedido,
				nombre,
				total,
				handleButton,
				handleSetProducto,
				hanledChangeModal,
				hanledAgregarPedido,
				hanledEditarCantidad,
				eliminarProducto,
				setNombre,
				colocarOrden,
			}}
		>
			{children}
		</RestauranteContext.Provider>
	);
};

export { RestauranteProvider };
export default RestauranteContext;
