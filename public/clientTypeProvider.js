/* global app, angular */
app.factory('TypeProvider', function ()
{
    return {
        getType: function()
        {
            return 'client';
        }
    };
});