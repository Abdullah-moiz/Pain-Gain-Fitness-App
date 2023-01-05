import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Cart from './module1/Components/Cart';
import LandingEcommerce from './module1/Pages/LandingEcommerce';
import Login from './module/pages/Login.jsx';
import Registration from './module/pages/Registration.jsx';
import UserInformation from './module/pages/UserInformation';
import Equipments from './module1/Pages/Equipments.jsx'
import Accessories from './module1/Pages/Accessories.jsx'
import Medicines from './module1/Pages/Medicines.jsx';
import Search from './module1/Pages/Search'
import Landing from './module/pages/Landing';
import ProductView from './module1/Pages/ProductView';
import Order from './module1/Pages/Order';
import MyOrders from './module1/Pages/MyOrders';
import OrderDetails from './module1/Pages/OrderDetails';
import FourZeroFour from './module/pages/FourZeroFour'
import DashAdmin from './module1/Pages/DashAdmin'
import DashSupplier from './module1/Pages/DashSupplier'
import SupplierOrderAction from './module1/Pages/SupplierOrderAction';
import TraineeLandingMain from './module2/Pages/TraineeLandingMain';
import CustomerComplain from './module1/Pages/CustomerComplain';
import ComplainsDetails from './module1/Pages/ComplainsDetails';
import ContactUS from './module1/Pages/ContactUS';
import UserComplain from './module1/Pages/UserComplain';
import CustomerComplainView from './module1/Pages/CustomerComplainView'
import AdminOrderTracking from './module1/Pages/AdminOrderTracking';
import AdminOrderTrackingDetail from './module1/Pages/AdminOrderTrackingDetail';
import SupplierForm from './module/pages/SupplierForm';
import ADMINSupplierApplicationView from './module1/Pages/ADMINSupplierApplicationView';
import PersonalTrainerForm from './module/pages/PersonalTrainerForm';
import AdminTrainerApplicationView from './module1/Pages/AdminTrainerApplicationView';
import TrainersProfile from './module2/Pages/TrainersProfile';
import HirePayment from './module2/Pages/HirePayment';
import PersonalTrainer from './module2/Pages/PersonalTrainer';
import AboutUS from './module/pages/AboutUS';
import MainChat from './chat/pages/MainChat';
import TrainerChat from './chat/pages/TrainerChat';



function App() {


  const [machineData, setMachineData] = useState([])
  const [accessoriesData, setAccessoriesData] = useState([])
  const [medicineData, setMedicinedata] = useState([])

  const [cardData, setcardData] = useState();

  // ^ fetch All Data
  const AllDatas = async () => {
    try {
      axios.get('http://localhost:5010/GetAllmachineData')
        .then(res => res.data)
        .then(data => setMachineData((data)))

    } catch (error) {
      console.log('error from getting machine Data' + error.message);
    }
    try {
      axios.get('http://localhost:5010/getAllAccessoriesData')
        .then(res => res.data)
        .then(data => setAccessoriesData((data)))
    } catch (error) {
      console.log('error from getting machine Data' + error.message);
    }
    try {
      axios.get('http://localhost:5010/getAllmedicineData')
        .then(res => res.data)
        .then(data => setMedicinedata((data)))
    } catch (error) {
      console.log('error from getting machine Data' + error.message);
    }
  }


  useEffect(() => {
    AllDatas();
  }, [])


  let getCardData = (x) => {
    setcardData(x)
  }




  return (
    <>

      <Router>
        <Routes>

          {/*  Main Module  paths */}
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Registration />} />
          <Route exact path='/about-us' element={<AboutUS />} />


          {/* E commerce Shop Module */}

          <Route exact path='/shop' element={<LandingEcommerce machineData={machineData} accessoriesData={accessoriesData} medicineData={medicineData} />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/accessories' element={<Accessories accessoriesData={accessoriesData} getCardData={getCardData} />} />
          <Route exact path='/productview' element={<ProductView productData={cardData} />} />
          <Route exact path='/equipment' element={<Equipments machineData={machineData} getCardData={getCardData} />} />
          <Route exact path='/medicine' element={<Medicines medicineData={medicineData} getCardData={getCardData} />} />
          <Route exact path='/search' element={<Search machineData={machineData} accessoriesData={accessoriesData} medicineData={medicineData} />} />
          <Route exact path='/order' element={<Order />} />
          <Route exact path='/contactus' element={<ContactUS />} />
          <Route exact path='/cus-complain' element={<CustomerComplain />} />
          <Route exact path='/cus-complain/complainDetail/:id' element={<ComplainsDetails />} />
          <Route exact path='/myorders' element={<MyOrders />} />
          <Route exact path='myorders/orderDetail/:id' element={<OrderDetails />} />
          <Route exact path='userComplainDetail/cusComplainDetail/:id' element={<CustomerComplainView />} />
          <Route exact path='/userComplainDetail' element={<UserComplain />} />
          <Route exact path='/supplier-application' element={<ADMINSupplierApplicationView />} />
          <Route exact path='/trainer-application' element={<AdminTrainerApplicationView />} />
          <Route exact path='/adminOrderTracking' element={<AdminOrderTracking />} />
          <Route exact path='/adminOrderTracking/adminorderDetail/:id' element={<AdminOrderTrackingDetail />} />


          {/* Personal Trainer Module Trainee Module Routes */}
          <Route exact path='/registerform' element={<UserInformation />} />
          <Route exact path='/personal-trainer' element={<PersonalTrainerForm />} />
          <Route exact path='/supplierForm' element={<SupplierForm />} />
          <Route exact path='/home' element={<TraineeLandingMain />} />
          <Route exact path='/trainers-profiles' element={<TrainersProfile />} />
          <Route exact path='/hirePayment/:id' element={<HirePayment />} />
          <Route exact path='/trainer' element={<TrainerChat />} />







          {/* extra modules Routes */}
          <Route exact path='/admin' element={<DashAdmin />} />
          <Route exact path='/TrainerDashboard' element={<PersonalTrainer />} />
          <Route exact path='/supplier' element={<DashSupplier />} />
          <Route exact path='supplier/orderDetail/:id' element={<SupplierOrderAction />} />



          {/* main chat module */}
          <Route exact path='/main-chat' element={<MainChat />} />

          {/* 404 path */}
          <Route exact path='*' element={<FourZeroFour />} />

        </Routes>
      </Router>

    </>
  );
}

export default App;
