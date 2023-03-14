import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppHeader from './component/uicomponent/AppHeader';
import Home from './component/screens/Home';
import AdminLogin from './component/screens/Admin/AdminLogin';
import Main from './component/screens/Main';
import CreateAdmin from './component/screens/Admin/CreateAdmin';
import AdminDetails from './component/screens/Admin/AdminDetails';
import EditAdmin from './component/screens/Admin/EditAdmin';
import EmployeeLogin from './component/screens/EmployeeLogin';
import CreateVendor from './component/screens/Vendor/CreateVendor';
import VendorDetails from './component/screens/Vendor/VendorsDetails';
import EditVendor from './component/screens/Vendor/EditVendor';
import CreateEmployee from './component/screens/Employee/CreateEmployee';
import EditEmployee from './component/screens/Employee/EditEmployee';
import EmployeeDetails from './component/screens/Employee/EmployeeDetails';
import CreateStore from './component/screens/Store/CreateStore';
import StoreDetails from './component/screens/Store/StoreDetails';
import EditStore from './component/screens/Store/EditStore';
import CreateCategory from './component/screens/Category/CreateCategory';
import CategoryDetails from './component/screens/Category/CategoryDetails';
import EditCategory from './component/screens/Category/EditCategory';
import CreateBrand from './component/screens/Brands/CreateBrand';
import EditBrands from './component/screens/Brands/EditBrands';
import BrandDetails from './component/screens/Brands/BrandsDetails';
import CreateModel from './component/screens/Model/CreateModel';
import EditModel from './component/screens/Model/EditModel';
import ModelDetails from './component/screens/Model/ModelDetails';
import CreateBank from './component/screens/Bank/CreateBank';
import BankDetails from './component/screens/Bank/BankDetails';
import EditBank from './component/screens/Bank/EditBank';
import EmployeeClock from './component/screens/EmployeeClock';
import Map from './component/screens/Map';
import CreateServiceType from './component/screens/ServiceType/CreateServiceType';
import ServiceTypeDetails from './component/screens/ServiceType/ServiceTypeDetails';
import EditServiceType from './component/screens/ServiceType/EditServiceType';
import CreateProduct from './component/screens/Products/CreateProduct';
import ProductDetails from './component/screens/Products/ProductDetails';
import EditProduct from './component/screens/Products/EditProduct';
import AttendanceDetail from './component/screens/Attendance/AttendanceDetails';
import EmployeeAttendance from './component/screens/Attendance/EmployeeAttendance';
import AppNetInfo from './component/AppNetInfo';
import EmployeeAvailable from './component/EmployeeAvailable';
import CreateServiceMan from './component/screens/ServiceMan/CreateServiceMan';
import ServiceManDetails from './component/screens/ServiceMan/ServiceManDetails';
import EditServiceMan from './component/screens/ServiceMan/EditServiceMan';
import Print from './component/Print';
import Barcode from './component/Barcode';
import BarcodeScanner from './component/BarcodeScanner';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          component={BarcodeScanner}
          name="Barcode Scanner"
        />

        <Stack.Screen
          options={{headerShown: false}}
          component={Barcode}
          name="Barcode"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={Print}
          name="Print"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={Home}
          name="Home"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={Main}
          name="Main"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={AdminLogin}
          name="Admin Login"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={EmployeeLogin}
          name="Employee Login"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={EmployeeClock}
          name="EC"
        />
        <Stack.Screen
          options={{headerShown: false}}
          component={Map}
          name="Map"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateAdmin}
          name="Create Admin"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditAdmin}
          name="Edit Admin"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Admin" />,
          }}
          component={AdminDetails}
          name="Admins"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateVendor}
          name="Create Vendor"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditVendor}
          name="Edit Vendors"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Vendor" />,
          }}
          component={VendorDetails}
          name="Vendor Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateStore}
          name="Create Store"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditStore}
          name="Edit Store"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Store" />,
          }}
          component={StoreDetails}
          name="Store Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateEmployee}
          name="Create Employee"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditEmployee}
          name="Edit Employee"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Employee" />,
          }}
          component={EmployeeDetails}
          name="Employee Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateBank}
          name="Create Bank"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditBank}
          name="Edit Bank"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Bank" />,
          }}
          component={BankDetails}
          name="Bank Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateCategory}
          name="Create Category"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditCategory}
          name="Edit Category"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Category" />,
          }}
          component={CategoryDetails}
          name="Category Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateBrand}
          name="Create Brand"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditBrands}
          name="Edit Brands"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Brand" />,
          }}
          component={BrandDetails}
          name="Brand Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateModel}
          name="Create Model"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditModel}
          name="Edit Model"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Model" />,
          }}
          component={ModelDetails}
          name="Model Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateServiceType}
          name="Create Service Type"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditServiceType}
          name="Edit Service Type"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Service Type" />,
          }}
          component={ServiceTypeDetails}
          name="Service Type Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateProduct}
          name="Create Product"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditProduct}
          name="Edit Product"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Product" />,
          }}
          component={ProductDetails}
          name="Product Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={AttendanceDetail}
          name="Attendance Details"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Attendance Details" />,
          }}
          component={EmployeeAttendance}
          name="Employee Attendance"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EmployeeAvailable}
          name="Employee Available"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={CreateServiceMan}
          name="Create Service Man"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
          }}
          component={EditServiceMan}
          name="Edit Service Man"
        />
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Monteserrat',
            },
            headerRight: () => <AppHeader route="Create Service Man" />,
          }}
          component={ServiceManDetails}
          name="Service Man Details"
        />
      </Stack.Navigator>
      <AppNetInfo />
    </NavigationContainer>
  );
}
