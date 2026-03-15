import React, { useState, createContext, useContext } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { AboutUsPage } from './components/AboutUsPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { HomePage } from './components/HomePage';
import { DesignStudio } from './components/DesignStudio';
import { Marketplace } from './components/Marketplace';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { MyOrders } from './components/MyOrders';
import { OrderDetails } from './components/OrderDetails';
import { ManufacturerDirectory } from './components/ManufacturerDirectory';
import { ProductionDashboard } from './components/ProductionDashboard';
import { Community } from './components/Community';
import { Analytics } from './components/Analytics';
import { Rankings } from './components/Rankings';
import { AIRecommendations } from './components/AIRecommendations';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';

import { ManufacturerSelection } from './components/ManufacturerSelection';
import { Checkout } from './components/Checkout';

// Role-based Dashboards
import { DesignerDashboard } from './components/dashboards/DesignerDashboard';
import { BrandDashboard } from './components/dashboards/BrandDashboard';
import { ManufacturerDashboard } from './components/dashboards/ManufacturerDashboard';
import { ModelDashboard } from './components/dashboards/ModelDashboard';
import { ModelJobsPage } from './components/dashboards/ModelJobsPage';
import { ModelAnalyticsPage } from './components/dashboards/ModelAnalyticsPage';
import { ModelPortfolio } from './components/dashboards/ModelPortfolio';
import { ModelOrders } from './components/dashboards/ModelOrders';
import { ModelOrderDetails } from './components/dashboards/ModelOrderDetails';
import { ModelAnalytics } from './components/dashboards/ModelAnalytics';
import { ModelRanking } from './components/dashboards/ModelRanking';
import { BrandCommunityPage } from './components/dashboards/BrandCommunityPage';
import { BrandProductionPage } from './components/dashboards/BrandProductionPage';
import { ModelProfilePage } from './components/dashboards/ModelProfilePage';
import { ModelsDirectoryPage } from './components/dashboards/ModelsDirectoryPage';

// Studio Pages
import { StudioEntryPage } from './components/studio/StudioEntryPage';
import { StudioDesignPage } from './components/studio/StudioDesignPage';
import { StudioFabricSelectionPage } from './components/studio/StudioFabricSelectionPage';
import { StudioManufacturerMatchingPage } from './components/studio/StudioManufacturerMatchingPage';
import { StudioManufacturerProfilePage } from './components/studio/StudioManufacturerProfilePage';

// Customer Pages
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { CustomerOrders } from './components/customer/CustomerOrders';
import { CustomerCommunity } from './components/customer/CustomerCommunity';
import { CustomerStudio } from './components/customer/CustomerStudio';
import { CustomerShop } from './components/customer/CustomerShop';
import { CustomerSettings } from './components/customer/CustomerSettings';
import { CustomerProductDetails } from './components/customer/CustomerProductDetails';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerCheckout } from './components/customer/CustomerCheckout';
import { CustomerProfilePage } from './components/customer/CustomerProfilePage';
import { CustomerSelectManufacturer } from './components/customer/CustomerSelectManufacturer';

// Manufacturer Pages
import { ManufacturerBranchSelection } from './components/manufacturer/ManufacturerBranchSelection';
import { UnifiedManufacturerDashboard } from './components/manufacturer/UnifiedManufacturerDashboard';
import { ManufacturerOrders } from './components/manufacturer/ManufacturerOrders';
import { ManufacturerInventory } from './components/manufacturer/ManufacturerInventory';
import { ManufacturerPlanning } from './components/manufacturer/ManufacturerPlanning';
import { ManufacturerAnalytics } from './components/manufacturer/ManufacturerAnalytics';
import { ManufacturerCommunityPage } from './components/manufacturer/ManufacturerCommunityPage';
import { ManufacturerSettings } from './components/manufacturer/ManufacturerSettings';
import { GarmentFactoryDashboard } from './components/manufacturer/GarmentFactoryDashboard';
import { PrintOnFactoryDashboard } from './components/manufacturer/PrintOnFactoryDashboard';
import { TailorDashboard } from './components/manufacturer/TailorDashboard';
import { ManufacturerCommunity } from './components/manufacturer/ManufacturerCommunity';
import { ManufacturerMaterials } from './components/manufacturer/ManufacturerMaterials';
import { ManufacturerPayments } from './components/manufacturer/ManufacturerPayments';
import { GarmentFactoryOrders } from './components/manufacturer/GarmentFactoryOrders';
import { GarmentFactoryProduction } from './components/manufacturer/GarmentFactoryProduction';
import { GarmentFactoryAnalytics } from './components/manufacturer/GarmentFactoryAnalytics';
import { GarmentFactoryCommunity } from './components/manufacturer/GarmentFactoryCommunity';
import { GarmentFactoryMaterials } from './components/manufacturer/GarmentFactoryMaterials';
import { PrintOnFactoryOrders } from './components/manufacturer/PrintOnFactoryOrders';
import { PrintOnFactoryProduction } from './components/manufacturer/PrintOnFactoryProduction';
import { PrintOnFactoryAnalytics } from './components/manufacturer/PrintOnFactoryAnalytics';
import { PrintOnFactoryCommunity } from './components/manufacturer/PrintOnFactoryCommunity';
import { PrintOnFactoryMaterials } from './components/manufacturer/PrintOnFactoryMaterials';
import { TailorOrders } from './components/manufacturer/TailorOrders';
import { TailorProduction } from './components/manufacturer/TailorProduction';
import { TailorAnalytics } from './components/manufacturer/TailorAnalytics';
import { TailorCommunity } from './components/manufacturer/TailorCommunity';
import { TailorMaterials } from './components/manufacturer/TailorMaterials';

// Local Brand Pages
import { LocalBrandDashboard } from './components/localbrand/LocalBrandDashboard';
import { LocalBrandManufacturers } from './components/localbrand/LocalBrandManufacturers';
import { LocalBrandProcess } from './components/localbrand/LocalBrandProcess';
import { LocalBrandModels } from './components/localbrand/LocalBrandModels';
import { LocalBrandOrders } from './components/localbrand/LocalBrandOrders';
import { LocalBrandAnalytics } from './components/localbrand/LocalBrandAnalytics';
import { LocalBrandStudio } from './components/localbrand/LocalBrandStudio';
import { LocalBrandSelectManufacturer } from './components/localbrand/LocalBrandSelectManufacturer';
import { LocalBrandSettings } from './components/localbrand/LocalBrandSettings';
import { LocalBrandCheckout } from './components/localbrand/LocalBrandCheckout';
import { LocalBrandUnifiedDashboard } from './components/localbrand/LocalBrandUnifiedDashboard';

// Local Brand Studio Pages (New 3-page flow)
import { StudioSelectGarment } from './components/localbrand/studio/StudioSelectGarment';
import { StudioDesignGarment } from './components/localbrand/studio/StudioDesignGarment';
import { StudioSelectManufacturer } from './components/localbrand/studio/StudioSelectManufacturer';

type UserRole = 'customer' | 'brand' | 'manufacturer' | 'model' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  manufacturerBranch?: 'garment-factory' | 'print-on-factory' | 'tailor';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: string;
  navigate: (page: string, params?: any) => void;
  routeParams?: any;
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [routeParams, setRouteParams] = useState<any>(undefined);
  const [cart, setCart] = useState<any[]>([]);

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setRouteParams(params || undefined);
  };

  const addToCart = (item: any) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now().toString() }]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.cartId !== id));
  };

  const contextValue: AppContextType = {
    user,
    setUser,
    currentPage,
    navigate,
    routeParams,
    cart,
    addToCart,
    removeFromCart,
  };

  const renderPage = () => {
    if (!user) {
      switch (currentPage) {
        case 'welcome':
          return <WelcomePage />;
        case 'about':
        case 'about-us':
          return <AboutUsPage />;
        case 'login':
          return <LoginPage />;
        case 'register':
          return <RegisterPage />;
        default:
          return <WelcomePage />;
      }
    }

    // Role-based dashboard routing
    if (currentPage === 'home') {
      switch (user.role) {
        case 'customer':
          return <CustomerDashboard />;
        case 'brand':
          return <BrandDashboard />;
        case 'manufacturer':
          return <ManufacturerDashboard />;
        case 'model':
          return <ModelDashboard />;
        default:
          return <HomePage />;
      }
    }
    
    // Customer-specific pages
    if (currentPage === 'customer-orders') {
      return <CustomerOrders />;
    }
    if (currentPage === 'customer-community') {
      return <CustomerCommunity />;
    }
    if (currentPage === 'customer-studio') {
      return <CustomerStudio />;
    }
    if (currentPage === 'customer-shop') {
      return <CustomerShop />;
    }
    if (currentPage === 'customer-settings') {
      return <CustomerSettings />;
    }
    if (currentPage === 'customer-product-details') {
      return <CustomerProductDetails />;
    }
    if (currentPage === 'customer-cart') {
      return <CustomerCart />;
    }
    if (currentPage === 'customer-checkout') {
      return <CustomerCheckout />;
    }
    if (currentPage === 'customer-profile') {
      return <CustomerProfilePage />;
    }
    if (currentPage === 'customer-dashboard') {
      return <CustomerDashboard />;
    }
    if (currentPage === 'customer-select-manufacturer') {
      return <CustomerSelectManufacturer />;
    }
    
    // Model-specific pages
    if (currentPage === 'model-dashboard') {
      return <ModelDashboard />;
    }
    if (currentPage === 'model-jobs') {
      return <ModelJobsPage />;
    }
    if (currentPage === 'model-profile') {
      return <ModelProfilePage />;
    }
    if (currentPage === 'models-directory') {
      return <ModelsDirectoryPage />;
    }
    if (currentPage === 'model-portfolio') {
      return <ModelPortfolio />;
    }
    if (currentPage === 'model-orders') {
      return <ModelOrders />;
    }
    if (currentPage === 'model-order-details') {
      return <ModelOrderDetails />;
    }
    if (currentPage === 'model-analytics') {
      return <ModelAnalytics />;
    }
    if (currentPage === 'model-ranking') {
      return <ModelRanking />;
    }
    
    // Brand-specific pages
    if (currentPage === 'brand-dashboard') {
      return <BrandDashboard />;}
    if (currentPage === 'brand-community') {
      return <BrandCommunityPage />;
    }
    if (currentPage === 'brand-production') {
      return <BrandProductionPage />;
    }
    
    // Manufacturer pages
    if (currentPage === 'manufacturer-branch-selection') {
      return <ManufacturerBranchSelection />;
    }
    
    // New Unified Manufacturer System
    if (currentPage === 'manufacturer-dashboard') {
      return <UnifiedManufacturerDashboard />;
    }
    if (currentPage === 'manufacturer-orders') {
      return <ManufacturerOrders />;
    }
    if (currentPage === 'manufacturer-inventory') {
      return <ManufacturerInventory />;
    }
    if (currentPage === 'manufacturer-planning') {
      return <ManufacturerPlanning />;
    }
    if (currentPage === 'manufacturer-analytics') {
      return <ManufacturerAnalytics />;
    }
    if (currentPage === 'manufacturer-settings') {
      return <ManufacturerSettings />;
    }
    
    // Garment Factory pages
    if (currentPage === 'garment-factory-dashboard') {
      return <GarmentFactoryDashboard />;
    }
    if (currentPage === 'garment-factory-orders') {
      return <GarmentFactoryOrders />; // Will create separate Orders page later
    }
    if (currentPage === 'garment-factory-production') {
      return <GarmentFactoryProduction />; // Will create separate Production page later
    }
    if (currentPage === 'garment-factory-analytics') {
      return <GarmentFactoryAnalytics />;
    }
    if (currentPage === 'garment-factory-materials') {
      return <GarmentFactoryMaterials />;
    }
    if (currentPage === 'garment-factory-community') {
      return <GarmentFactoryCommunity />;
    }
    if (currentPage === 'garment-factory-payments') {
      return <ManufacturerPayments />;
    }
    
    // Print-on-Factory pages
    if (currentPage === 'print-on-factory-dashboard') {
      return <PrintOnFactoryDashboard />;
    }
    if (currentPage === 'print-on-factory-orders') {
      return <PrintOnFactoryOrders />; // Will create separate Orders page later
    }
    if (currentPage === 'print-on-factory-production') {
      return <PrintOnFactoryProduction />; // Will create separate Production page later
    }
    if (currentPage === 'print-on-factory-analytics') {
      return <PrintOnFactoryAnalytics />;
    }
    if (currentPage === 'print-on-factory-materials') {
      return <PrintOnFactoryMaterials />;
    }
    if (currentPage === 'print-on-factory-community') {
      return <PrintOnFactoryCommunity />;
    }
    if (currentPage === 'print-on-factory-payments') {
      return <ManufacturerPayments />;
    }
    
    // Tailor pages
    if (currentPage === 'tailor-dashboard') {
      return <TailorDashboard />;
    }
    if (currentPage === 'tailor-orders') {
      return <TailorOrders />; // Will create separate Orders page later
    }
    if (currentPage === 'tailor-production') {
      return <TailorProduction />; // Will create separate Production page later
    }
    if (currentPage === 'tailor-analytics') {
      return <TailorAnalytics />;
    }
    if (currentPage === 'tailor-materials') {
      return <TailorMaterials />;
    }
    if (currentPage === 'tailor-community') {
      return <TailorCommunity />;
    }
    if (currentPage === 'tailor-payments') {
      return <ManufacturerPayments />;
    }
    
    // Studio pages
    if (currentPage === 'studio-entry') {
      return <StudioEntryPage />;
    }
    if (currentPage === 'studio-design') {
      return <StudioDesignPage />;
    }
    if (currentPage === 'studio-fabric-selection') {
      return <StudioFabricSelectionPage />;
    }
    if (currentPage === 'studio-manufacturer-matching') {
      return <StudioManufacturerMatchingPage />;
    }
    if (currentPage === 'studio-manufacturer-profile') {
      return <StudioManufacturerProfilePage />;
    }
    
    // Local Brand pages
    if (currentPage === 'localbrand-dashboard' || 
        currentPage === 'localbrand-models' || 
        currentPage === 'localbrand-process' || 
        currentPage === 'localbrand-orders' || 
        currentPage === 'localbrand-analytics') {
      return <LocalBrandUnifiedDashboard />;
    }
    if (currentPage === 'localbrand-manufacturers') {
      return <LocalBrandManufacturers />;
    }
    if (currentPage === 'localbrand-studio') {
      return <LocalBrandStudio />;
    }
    if (currentPage === 'localbrand-select-manufacturer') {
      return <LocalBrandSelectManufacturer />;
    }
    if (currentPage === 'localbrand-settings') {
      return <LocalBrandSettings />;
    }
    if (currentPage === 'localbrand-checkout') {
      return <LocalBrandCheckout />;
    }

    // Local Brand Studio Pages (New 3-page flow)
    if (currentPage === 'studio-select-garment') {
      return <StudioSelectGarment />;
    }
    if (currentPage === 'studio-design-garment') {
      return <StudioDesignGarment />;
    }
    if (currentPage === 'studio-select-manufacturer') {
      return <StudioSelectManufacturer />;
    }

    switch (currentPage) {
      case 'design-studio':
        return <DesignStudio />;
      case 'marketplace':
        return <Marketplace />;
      case 'product-details':
        return <ProductDetails />;
      case 'manufacturer-selection':
        return <ManufacturerSelection />;
      case 'checkout':
        return <Checkout />;
      case 'cart':
        return <Cart />;
      case 'orders':
        return <MyOrders />;
      case 'order-details':
        return <OrderDetails />;
      case 'manufacturer-directory':
        return <ManufacturerDirectory />;
      case 'production-dashboard':
        return <ProductionDashboard />;
      case 'community':
        return <Community />;
      case 'analytics':
        return <Analytics />;
      case 'rankings':
        return <Rankings />;
      case 'ai-recommendations':
        return <AIRecommendations />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#4a5565] via-50% via-[#e5e7eb]">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}