import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationControl from "./components/Navigations/NavigationControl";
import { AuthenticationProvider } from "./context/Authentication/AuthenticationContext";
import { InventoryItemProvider } from "./context/Item/InventoryItemContext";
import { ThemeProvider } from "./context/Theme/ThemeContext";
import { SchoolProvider } from "./context/School/SchoolContext";
import { UsersProvider } from "./context/User/UserContext";
import { GeneralProvider } from "./context/General/GeneralContext";
import { DiscrepancyProvider } from "./context/Discrepancy/DiscrepancyContext";
import { ProfileProvider } from "./context/Profile/ProfileContext";
import { SettingProvider } from "./context/Setting/SettingContext";
import { TrackingProvider } from "./context/Tracking/TrackingContext";
import { ItemRequestProvider } from "./context/ItemRequest/ItemRequestContext";
import { MessageProvider } from "./context/Message/MessageContext";
import { AnalysisProvider } from "./context/Analysis/AnalysisContext";
import { LocationProvider } from "./context/Location/LocationContext";
import { SearchProvider } from "./components/Search/SearchContext";

function App() {
  return (
    <div>
      <AuthenticationProvider>
        <SettingProvider>
          <ThemeProvider>
            <GeneralProvider>
              <MessageProvider>
                <AnalysisProvider>
                  <UsersProvider>
                    <SchoolProvider>
                      <InventoryItemProvider>
                        <DiscrepancyProvider>
                          <LocationProvider>
                            <ProfileProvider>
                              <TrackingProvider>
                                <ItemRequestProvider>
                                  <SearchProvider>
                                    <NavigationControl />
                                  </SearchProvider>
                                </ItemRequestProvider>
                              </TrackingProvider>
                            </ProfileProvider>
                          </LocationProvider>
                        </DiscrepancyProvider>
                      </InventoryItemProvider>
                    </SchoolProvider>
                  </UsersProvider>
                </AnalysisProvider>
              </MessageProvider>
            </GeneralProvider>
          </ThemeProvider>
        </SettingProvider>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
