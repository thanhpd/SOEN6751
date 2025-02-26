package com.example.onesignal

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.onesignal.ui.theme.OneSignalTheme
import com.onesignal.OneSignal
import com.onesignal.debug.LogLevel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject


val ONESIGNAL_APP_ID = "e8a6ac15-a9bb-45cc-a37d-9622c6413aeb";

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        initOneSignal();
        setContent {
            OneSignalTheme {
                Scaffold( modifier = Modifier.fillMaxSize() ) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }

    fun initOneSignal() {
        // Verbose Logging set to help debug issues, remove before releasing your app.
        OneSignal.Debug.logLevel = LogLevel.VERBOSE

        // OneSignal Initialization
        OneSignal.initWithContext(this, ONESIGNAL_APP_ID)

        // requestPermission will show the native Android notification permission prompt.
        // NOTE: It's recommended to use a OneSignal In-App Message to prompt instead.
        CoroutineScope(Dispatchers.IO).launch {
            OneSignal.Notifications.requestPermission(false)
        }
    }
}

fun  sendSignal() {
    val notification = JSONObject()
    notification.put("headings", JSONObject().put("en", "Hello"))
    notification.put("contents", JSONObject().put("en", "This is a local notification"))
    OneSignal.Notifications.(notification, null)
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    TextButton(
        onClick = { sendSignal() }
    ) {
        Text("Text Button")
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    OneSignalTheme {
        Greeting("Android")
    }
}