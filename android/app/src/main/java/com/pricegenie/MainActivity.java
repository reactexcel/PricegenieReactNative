package com.excellence.PriceGenie;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     @Override
    public void onNewIntent (Intent intent) {
      super.onNewIntent(intent);
        setIntent(intent);
    } 
    @Override
    protected String getMainComponentName() {
        return "PriceGenie";
    }
     @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
    }
}
