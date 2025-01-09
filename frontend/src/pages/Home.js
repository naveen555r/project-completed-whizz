import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct';
import CategoryList from '../components/CategoryList';
import VerticalCardProduct from '../components/VerticalCardProduct';
import ROLE from '../common/role';

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Admin Panel if the user is an admin
    if (user?.role === ROLE.ADMIN) {
      navigate('/admin-panel'); // Assuming '/admin-panel' is the route for your AdminPanel
    }
  }, [user, navigate]);

  return (
    <div>
      {/* Common content for all users */}
      <div className="">
        <BannerProduct />
        <CategoryList />
        <VerticalCardProduct category={"pet foods"} heading={"Pet foods"} />
        <VerticalCardProduct category={"protein supplements"} heading={"Protein supplements"} />
        <VerticalCardProduct category={"vitamin supplements"} heading={"Vitamin supplements"} />
      </div>
    </div>
  );
};

export default Home;
