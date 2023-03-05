import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";

var sorting_plugin = (function (jspsych) {
    "use strict";
  
    const info = {
      name: "SORTING",
      parameters: {
        display_ordering: {
          type: jspsych.ParameterType.LIST,
          default: undefined,
        },
        // in their true order
        images: {
          type: jspsych.ParameterType.LIST,
          default: undefined,
        },
        score_function: {
            type: jspsych.ParameterType.FUNCTION,
            default: undefined, 
        },
      },
    };
  
    /**
     * **PLUGIN-NAME**
     *
     * SHORT PLUGIN DESCRIPTION
     *
     * @author YOUR NAME
     * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
     */
    class SortingPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
        
        // data saving
        var trial_data = {
            rt: response.rt,
            stimulus: trial.stimulus,
            button_response: response.button,
            response_source: response.source,
        };
        // end trial
        this.jsPsych.finishTrial(trial_data);
      }
    }
    PluginNamePlugin.info = info;
  
    return PluginNamePlugin;
  })(jsPsychModule);