import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop, deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import Modal from "@material-ui/core/Modal";
import StripeContainer from "../Checkout/PaymentForm";

const ListOrders = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const handlePay = (order) => {
    setSelectedOrder(order);
    setOpenPaymentModal(true);
  };

  const handleClose = () => {
    setOpenPaymentModal(false);
    setSelectedOrder(null);
  };

  const handleSuccess = () => {
    setOpenPaymentModal(false);
    setSelectedOrder(null);
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "deliveryFee",
      headerName: "Delivery Fee",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "deliveryDate",
      headerName: "Delivery Date",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => new Date(params.row.deliveryDate).toLocaleDateString(), // Format date
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => new Date(params.row.createdAt).toLocaleDateString(), // Format date
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.id}`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Pay",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button disabled={!(params.row.status === 'accepted' && params.row.paymentStatus !== 'completed') || params.row.status !== 'accepted'} onClick={() => handlePay(params.row)}>
          Pay
          </Button>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDelete(params.id)}>
            <AiOutlineDelete size={20} />
          </Button>
        );
      },
    },
  ];

  const rows = [];

  // Populate rows with order data
  products &&
    products.forEach((order) => {
      console.log(order);
      rows.push({
        id: order._id,
        deliveryFee: "US$ " + order.deliveryFee,
        status: order.orderStatus,
        paymentStatus: order.paymentStatus,
        deliveryDate: order.deliveryDate,
        createdAt: order.createdAt,
      });
    });
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
  
            {/* Payment Modal */}
            <Modal
              open={openPaymentModal}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className="p-4 bg-white rounded-lg shadow-lg mx-auto my-20 max-w-lg">
                {selectedOrder && (
                  <StripeContainer orderId={selectedOrder.id} amount={selectedOrder.deliveryFee} onSuccess={handleSuccess} />
                )}
              </div>
            </Modal>
          </div>
        )}
      </>
    );
};

export default ListOrders;
