
import { useState } from 'react';
import SignupOne from '../components/signup/SignupOne';
import NavHeader from '../components/NavHeader';
import SignupTwo from '../components/signup/SignupTwo';
import SignupThree from '../components/signup/SignupThree';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../@types/user';
import LoadingScreen from '../components/LoadingScreen';
import { useTypedSelector } from '../store/store';


const Signup = ({ option }: { option: string }) => {
  const [activeSection, setActiveSection] = useState(1);
  const isLoading = useTypedSelector(state => state.auth.isLoading);
  const changeActiveSection = (index: number) => {
    setActiveSection(index);
  }

  const [userSignupData, setUserSignupData] = useState<UserContextType | null>(null);
  const [stripeCumtomerInfo, setStripeCumtomerInfo] = useState<any | null>(null);
  const handleUserSignupData = (data: any) => {
    console.log(data);
    setUserSignupData(data);
  }

  const handleChangeUserStripeCustomerInfo = (data: any) => {
    setStripeCumtomerInfo({
      prices: data.prices,
      customer: data.customer
    });
  }
  return (
    <>
      <NavHeader />
      <UserContext.Provider value={{ userSignupData, setUserSignupData: handleUserSignupData, stripeCumtomerInfo, setStripeInfo: handleChangeUserStripeCustomerInfo }}>
        {activeSection === 1 &&
          <SignupOne handleActiveSectionChange={changeActiveSection} />
        }
        {activeSection === 2 &&
          <SignupTwo handleActiveSectionChange={changeActiveSection} />
        }
        {activeSection === 3 &&
          <SignupThree handleActiveSectionChange={changeActiveSection} option={option} />
        }
        {isLoading &&
          <LoadingScreen />
        }
      </UserContext.Provider>

    </>
  )
}

export default Signup;