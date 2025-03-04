﻿using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ToDoConnector
{
  public class TaskHelper
  {
    public static async Task PostWelcomeMessage(string webhook, string channelName)
    {
      var activityText = $"An instance of the ToDo connector (named {channelName}) has been set up. We will send you notification whenever new task is added.";
      string cardJson =
        "{ \"@type\": \"MessageCard\"," +
        "  \"summary\": \"Welcome Message\"," +
        "  \"sections\": [ " +
        "    { " +
        "      \"activityTitle\": \"Welcome Message\"," +
        "      \"text\": \"" + activityText + "\"" +
        "    }" +
        "  ]" +
        "}";

      await PostCardAsync(webhook, cardJson);
    }

    private static async Task PostCardAsync(string webhook, string cardJson)
    {
      //prepare the http POST
      HttpClient client = new HttpClient();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      var content = new StringContent(cardJson, System.Text.Encoding.UTF8, "application/json");
      using (var response = await client.PostAsync(webhook, content))
      {
        // Check response.IsSuccessStatusCode and take appropriate action if needed.
        var responseText = await response.Content.ReadAsStringAsync();
        var status = response.StatusCode;
      }
    }
  }
}