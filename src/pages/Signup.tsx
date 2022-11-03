
import { useState } from 'react';
import SignupOne from '../components/signup/SignupOne';
import NavHeader from '../components/NavHeader';
import SignupTwo from '../components/signup/SignupTwo';
import SignupThree from '../components/signup/SignupThree';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../@types/user';


const Signup = () => {
  const [activeSection, setActiveSection] = useState(1);

  const changeActiveSection = (index: number) => {
    setActiveSection(index);
  }



  const [userSignupData, setUserSignupData] = useState<UserContextType | null>(null);

  const handleUserSignupData = (data: any) => {
    console.log(data);
    setUserSignupData(data);
  }
  return (
    <>
      <NavHeader />
      <UserContext.Provider value={{userSignupData, setUserSignupData: handleUserSignupData}}>
        {activeSection === 1 &&
          <SignupOne handleActiveSectionChange={changeActiveSection} />
        }
        {activeSection === 2 &&
          <SignupTwo handleActiveSectionChange={changeActiveSection} />
        }
        {activeSection === 3 &&
          <SignupThree handleActiveSectionChange={changeActiveSection} />
        }
      </UserContext.Provider>

    </>
  )
}

export default Signup;